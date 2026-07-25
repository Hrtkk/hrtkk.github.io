---
title: "Data Replication: Single-Leader, Multi-Leader, and Leaderless"
description: "Three ways to keep copies in sync, and the failure mode each one is secretly optimising for."
date: 2026-07-25 08:00:00 +0530
category: "DDIA"
---

Replication means keeping a copy of the same data on multiple machines. We do it to keep data close to users, to keep the system available when nodes fail, and to scale out reads. The hard part is not copying the data — it's keeping the copies consistent while the data keeps changing.

In this post, we will discuss data replication through three main approaches: **single-leader**, **multi-leader**, and **leaderless** replication.

## Single-Leader Replication
- When we want to maintain multiple replicas of a database, we make a single database instance the **leader** and the rest become **followers** (also called hot standbys, slaves, or secondaries).
- Every write request goes to the leader, which first writes the new data to its local storage and then forwards the same change to its followers.
- Reads can go to any replica, but **only the leader accepts writes**.
- There are two obvious ways to propagate writes, plus a practical middle ground:
  - **Synchronous**: keeps the whole system consistent, but adds latency to every write — and a single slow follower stalls everything.
  - **Asynchronous**: gives better response time, but only eventual consistency — and recent writes can be lost if the leader dies.
  - **Semi-synchronous**: the leader needs an acknowledgement from at least one follower before acknowledging the write to the client — a good balance of durability and latency.

### Setting up a new follower
1. Take a consistent snapshot of the leader's database at some point in time, without locking the entire database.
2. Copy the snapshot to the new follower node.
3. The follower connects to the leader and requests all the data changes that have happened since the snapshot was taken. The snapshot is associated with an exact position in the leader's replication log — the *log sequence number* in PostgreSQL, the *binlog coordinates* in MySQL.
4. When the follower has processed the backlog of data changes, we say it has ***caught up***.

### Handling node outages
- **Follower failure**: easy — just reconnect to the leader and resume replication from the last replication log offset.
- **Leader failure**: this requires ***failover***:
  - Promote a follower to be the new leader.
  - Reconfigure clients to send their writes to the new leader.
  - Make the other followers replicate from the new leader.

  The steps in practice:
  1. **Determine that the leader has failed** — usually via heartbeat timeouts.
  2. **Choose a new leader** — through consensus (an election).
  3. **Reconfigure the system** to use the new leader — and if the old leader comes back, it must be demoted to a follower and recognize the new leader.

  Failover is full of traps:
  - Loss of data (the old leader had writes that never reached the new one).
  - Auto-increment sequence numbers that have already been handed out get reused.
  - **Split brain**: more than one node believes it is the leader.
  - Choosing the right timeout: too short causes unnecessary failovers, too long causes unavailability.

### Replication logs
How does the leader actually describe its changes to followers?
- **Statement-based replication**
  - Log every write statement (the SQL itself). Issues:
    1. Non-deterministic functions like `NOW()` or `RAND()` produce different values on each replica.
    2. Statements that depend on existing data (auto-incrementing columns, or rows from other tables) must be executed in exactly the same order everywhere.
    3. Statements can have side effects (triggers, stored procedures, user-defined functions).
- **Write-ahead log (WAL) shipping**
  - The log is an append-only sequence of bytes containing all writes to the database (used by PostgreSQL and Oracle).
  - It contains details of which bytes changed in which disk blocks — closely coupled to the storage engine, so the database version and storage format must match across replicas.
- **Logical (row-based) log replication**
  - For an inserted row: the new values of all columns.
  - For a deleted row: the primary key, or the old values of all columns, so the row can be uniquely identified.
  - For an updated row: enough to uniquely identify the row, plus the new values of all columns.
  - Decoupled from the storage engine — this is also the foundation of ***change data capture***.
- **Trigger-based replication**
  - Implemented in the application layer using triggers and stored procedures.
  - Flexible, but has greater overhead and is more prone to bugs and limitations.

### Problems with replication lag
With asynchronous followers, a read can land on a replica that hasn't caught up yet. Three anomalies show up:

- **Read-your-own-writes**: a user might not see their own update immediately after making it, because their read went to a lagging replica. A common workaround is a sticky session — direct all reads for a user to the leader for some time after that user writes. Cross-device read-after-write adds further complexity.
- **Monotonic reads**: with asynchronous followers, a user can see things *moving backward in time* — two reads made one after the other return an older value the second time. Solved by making each user always read from the same replica (though this still doesn't guarantee different users see the same thing).
- **Consistent prefix reads**: when multiple writes have a **causal** dependency, their order matters — if a sequence of writes happens in a certain order, anyone reading those writes should see them appear in the same order. Violations usually occur in partitioned databases; causally related writes should go to the same partition.

## Multi-Leader Replication
Now allow more than one node to accept writes — typically one leader per datacenter.

**Pros:**
- **Better performance** — users are served by a nearby datacenter.
- **Tolerance of datacenter outages** — the other datacenters keep working.
- **Tolerance of network problems** — a broken link between datacenters doesn't block writes.
- Real-world implementations: Tungsten Replicator for MySQL, BDR for PostgreSQL, GoldenGate for Oracle.

**Cons:**
- The same data can be modified concurrently in two datacenters — you must **handle write conflicts**.
- Auto-incrementing keys, triggers, and integrity constraints can be problematic.

### Handling write conflicts
- **Conflict avoidance** — route all writes for a particular record through the same leader.
- **Converging toward a consistent state** — e.g. last-write-wins, or letting the higher-numbered replica win.
- **Custom conflict resolution logic**:
  - **On write**: the system calls your conflict handler as soon as it detects a conflict.
  - **On read**: all conflicting versions are retained and handed back on the next read; the application resolves the conflict (automatically or by asking the user) and writes the result back.
- Some other notable approaches:
  - **Conflict-free replicated data types (CRDTs)** — data structures that can be concurrently updated by multiple users and automatically resolve conflicts in sensible ways (two-way merge).
  - **Mergeable persistent data structures** — track history explicitly and use a three-way merge, like Git.
  - **Operational transformation** — designed for concurrent editing of an ordered list of items (this is what collaborative editors like Google Docs build on).

## Leaderless Replication
Databases like Dynamo, Riak, Cassandra, and Voldemort abandon the concept of a leader entirely — the client (or a coordinator) sends writes and reads to **several nodes in parallel**.

- If the client gets different responses from different nodes, a **version number** is used to decide which value is the most recent.
- Two mechanisms keep replicas converging:
  - **Read repair**: when a client detects a stale value on one replica during a read, it writes the up-to-date value back to that replica.
  - **Anti-entropy**: a background process constantly looks for differences between replicas and copies missing data over. Without it, values that are rarely read may be missing from some replicas for a long time.

### Quorums for reading and writing
- With ***n*** replicas, wait for ***w*** nodes to acknowledge a write, and query ***r*** nodes for a read.
- To reliably read up-to-date data, we need: **w + r > n** (quorum reads and writes).
- A quorum is not about majority for its own sake — the condition guarantees that the set of nodes you wrote to and the set you read from **overlap in at least one node**, so at least one node in every read has the latest version.

### Sloppy quorums and hinted handoff
- **Sloppy quorum**: during a network partition, accept writes anyway and store them on nodes that are reachable but aren't among the *n* "home" nodes where the value usually lives.
- **Hinted handoff**: once the home nodes are reachable again, any writes that a node temporarily accepted on behalf of another are forwarded to the appropriate home nodes.
- A sloppy quorum isn't a real quorum — it's an assurance of **durability**, not of read-your-latest-write.

## Wrapping up
- **Single-leader** is the simplest model and the default in most relational databases — but failover is where the dragons live.
- **Multi-leader** buys you multi-datacenter performance and availability at the price of conflict resolution.
- **Leaderless** systems trade coordination for quorum math, read repair, and anti-entropy.

This post is based on my notes from *Designing Data-Intensive Applications* (Chapter 5) — a book I can't recommend enough. Next up in this series: [database partitioning](/blog/2026/07/25/Database-Partitioning.html).
