---
title: "Change Data Capture with Debezium: PostgreSQL and Oracle"
description: "Reading the WAL instead of polling the table — connector config, schema changes, and the snapshot problem."
date: 2026-07-25 06:30:00 +0530
category: "System Design"
pillar: "distributed-systems"
tags: ["debezium", "cdc", "postgresql", "oracle", "kafka"]
status: "published"
---

Change Data Capture (CDC) is a pattern where every row-level change in a database — inserts, updates, and deletes — is captured as a stream of events that other systems can consume. Debezium is one of the most popular open-source CDC platforms: it tails the database's transaction log and publishes each change to Kafka.

In this post, we will look at how the Debezium connector works for PostgreSQL, and how the initial snapshot works for both PostgreSQL and Oracle.

## Debezium with PostgreSQL
- The connector captures **row-level changes** from the database.
- It relies on a PostgreSQL feature called ***logical decoding***, which allows extraction of the changes that were committed to the transaction log.
- The connector has two main parts:
  - **A logical decoding output plug-in**
    - You configure a replication slot that uses the output plug-in. The common choices are:
      - ***decoderbufs***: based on Protobuf
      - ***pgoutput***: the standard plug-in maintained by PostgreSQL itself
    - The connector interprets the raw replication event stream directly into change events.
  - **Java code (the connector)**
    - Reads the changes produced by the logical decoding output plug-in.
    - Uses PostgreSQL's streaming replication protocol to receive them.

### Things to keep in mind
- Logical decoding does **not** capture DDL changes (schema changes).
- On PostgreSQL versions before 16, logical decoding replication slots are supported only on **primary** servers — the connector can only run against the active primary, not against hot or warm standby replicas. (PostgreSQL 16 added logical decoding on standbys.)
- If the primary goes down and another server is promoted, you must adjust the connector configuration before restarting the connector.
- Because logical decoding replication slots publish changes **during commit** — and not post commit — undesirable side effects can occur:
  1. Publishing uncommitted changes when the primary dies before replication completes.
  2. Publishing changes that temporarily cannot be read because they are still being replicated.

### How the initial snapshot works (PostgreSQL)
When the connector starts for the first time, it takes a consistent snapshot of the existing data before streaming live changes:
1. Start a transaction with the ***SERIALIZABLE, READ ONLY, DEFERRABLE*** isolation level, to ensure that all subsequent reads in this transaction see a single consistent version of the data. Any changes made by other clients through later `INSERT`, `UPDATE`, and `DELETE` operations are not visible to this transaction.
2. Read the current position in the server's transaction log.
3. Scan the database tables and schemas, generate a `READ` event for each row, and write that event to the appropriate table-specific Kafka topic.
4. Commit the transaction.
5. Record the successful completion of the snapshot in the connector offsets.

## Debezium with Oracle
The Oracle connector follows a similar idea, but the snapshot procedure looks like this:
1. Establish a connection to the database.
2. Determine the tables to be captured. By default, the connector captures all tables except those excluded by configuration. After the snapshot completes, the connector continues to stream data for those tables. You can control this with `table.include.list` or `table.exclude.list`.
3. Obtain a `ROW SHARE MODE` lock on each of the captured tables to prevent structural changes from occurring during creation of the snapshot. Debezium holds these locks for only a short time.
4. Read the current ***system change number*** (SCN) position from the server's redo log.
5. Capture the structure of all the designated tables. The connector persists this schema information in its internal database schema history topic.
6. Release the locks obtained in step 3.
7. At the SCN position read in step 4, scan the tables designated for capture. During the scan the connector:
   1. Confirms that each table was created before the snapshot began. Tables created after the snapshot began are skipped — once the connector transitions to streaming, it emits change events for them.
   2. Produces a `READ` event for each row captured from a table. All read events carry the same SCN position, captured in step 4.
   3. Emits each `READ` event to the Kafka topic for the source table.

Once the snapshot completes, the connector switches to streaming mode and every committed change flows into Kafka as it happens — giving downstream systems a near-real-time, replayable view of the database.
