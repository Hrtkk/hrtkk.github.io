## Debezium Postgres
- captures row-level changes
- feature "***logical decoding***" allows the extraction of the changes that were commited to the transaction log.
- Main parts:
  - A Logical decoding output plug-in
    - configure a replication slot that uses output plug-in.
    - ***decoderbufs***: based on Protobuf
    - ***pgoutput***: maintained by PostgreSQL
    - Connector interprets the raw replication event streams directly into change events.
  - Java Code:
    reads changes produced by logical decoding output plug-in. 
    - uses PostgreSQL's streaming replication protocol.
  
  '''
    * Logical decoding does not support DDL changes.
    Logical decoding replication slots are supported on only primary servers.
    * In cluster, it will only run on active primary server, and can not run on hot or warm standy replicas.
    * If Primary servers goes down, and another server needs to be promoted, adjust the connector configuration before restarting the connector.
    * Because logical decoding replication slots publish changes during commit --  and not post commit -- undesirable side-effects can occur.
      1. publishing uncommited changes when the master dies before replication completes.
      2. publishing changes that can not be read temporarily because they are being replicated. 
  '''

### Snapshot
- Start a transaction with ***Serializable, READ ONLY, DEFERRABLE*** isolation level to ensure that subsequent reads in this transaction are againt a single consistent version of the data. Any changes to the data due to subsequent INSERT, UPDATe, and DELETE operations by other clients are not visible to this transaction.
- Read the current position in the server's transaction log
- Scan the database tables and schemas, generat a READ event for each row and write that event to the appropriate table specefic kafka topic.
- commit the transaction.
- Record the successful completion of the snapshot in the connector offsets.



### Oracle
1. Establish a connection to the database
2. Determine the tables to be captured. By default, the connector captures all tables except those with schemas that excludes them from capture. After the snapshot completes, the connector continues to stream data for the specific tables. you can configure: table.include.list or table.exclude.lsit
3. Obtain a `ROW SHARE MODE` lock on each of the caputure tables to prevent structural changes from occurring during creation of the snapshot. Debezium holds the locks for only a short time.
4. Read the current `system change number` (SNC) position from the server's redo log.
5. capture the structure of all the designated database tables. The connector persists schema information in its internal database schema history topic.
6. Release the lock obtained in step 3.
7. At the SCN position that was read in Step 4, the connector scans the tables that are designated fro capture. During the scan
  1. Confirms that the table was created before the snapshot began. If the table was created after the snapshor began, the connector skips the table. After the snapshot is complete, and the connector transitions to streaming, it emits change events for any tables that were created after the snapshot began.
  2. Prodces a read event for each row that is captured from a table. All the read event contains the same SCN psotion, captured in step 4.
  3. Emits each read event to the kafka topic for the source table.
  4. Release data table lock, if applicable.