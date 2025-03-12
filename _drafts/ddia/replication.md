### Replication Concepts
- We will be discussing data replication in three main approaches.
  - Single Leader
  - Multi Leader
  - Leaderless

- Sngle Leader
  - In a system, where we want to maintain multiple replicas of a database. We make single database instance as Leader and rest become follower.
  - When client send any request to database, the request is received by the leader database, which first write the new data to its local storage and forwards the same request to its followers(hot standby, slave, secondaries).
  - When client wants to read data, it can make request to any replica database instance, but only leader will be accepting write operations.
  - Obviously there are two ways to making this communication happen
    - Synchronous: Which keeps our whole sysem consistent but at the same time adds latency to reponse.
    - Asynchronous: Here we get eventual consistency but with better response time.
    - Semi-synchronous: In this approach, leader needs acknowledgement from at least one follower in order to acknowledge write to client.

  ### Setting up new follower
  1. Take a consistent snapshot of the leader's database at some point in time, without taking lock on the entire database.
  2. copy the snapshot to the new follower node.
  3. The follower connects to the leader and requests all the data changes that have happened since the snapshot was taken. Snapshot is associated with an exact position in the leader's replication log. 
    1. log sequence in postgresql
    2. binlog coordinates in mysql
  4. when the follower has processed the backlog of data changes, its called caught u

  
  ### Handling Node Outages
  - Follower Failure
    - just reconnect to leader, and resume replication from last replicatio log offset
  - Leader Failure
    - `Failover`
      - Promote a Follower to be a new leader.
      - Reconfigure the clinet to send their write to new leader.
      - Other follower mush follow new leader for replication
    1. Determine that the leader has failed: use proper TTL
    2. Choosing a new leader: through consensus: election
    3. Reconfigure the system to use the new leader
      - Client reconfiguration for new writes
      - if leader comes back, demote it to follower and it should recognize the new leader
        - Issues
          - loss of data
          - autoincrement sequence number already been used
          - split brain: more than one node is leader.
          - choosing right time out: too less: unnecessary failover, too high: unavailability

  ### Replication Logs
  - Statement based replication
    - logs every write statement
     - issues
      1. non deterministic function: now(), rand()
      2. in case of dependency: auto incrementing column, or set of already existing data of other tables and order of execution is also important.
      3. statements that vave side effects (triggers, stored procedure, user defined functions)
  - Write-ahead log (WAL)
    1. Log is append only sequence of bytes containing all writes to the database. [PostgreSQL and Oracle]
    2. Contains details of which bytes were changes in which disk blocks. Closely couples to the storage engine. so da version and storage format consistency is must. 
  - Logical(Row based) log replication
    1. for inserted row: new values of all columns
    2. for deleted row: primary key or old values of all columsn so that these can be uniquely identified
    3. for updated row: uniquely identify updated row and new values of all column.
    4. also called change data capture 
  - Trigger based replication
    1. using triggers and stored procedure.
    2. greater overhead and more prone to bugs and limitations

  ### Problem with replication lag
  
  #### Read your own write
    - user might not get updated value immediately after an update request, since read request goes replicas.
    - workaround: maintaining sticky session and direct all read request to leader for some time after a write request for a user.
    - Although there are other complexities, like cross-device read-after-write, any many others, but we have to deal with these problems.

  #### Monotonic Read
    - In asynchronous followers causes users to see things moving bakcward in time. multiple read request at same time returns different values.
    - solved by: each user should always read from same replica, but it does not guarantees same read for multiple user.
  #### Consistent Prefix Read
    - when multiple write has casual dependencies then sequence of write becomes important.
    - if a sequence of writes happens in a certain order, then anyone reading those writes will see them appear in the same order.
    - usually occur in partitioned database.
    - for casually related writes, it should be written to the same partition.

### Solution for replication lag



## Multi-Leader Replication
pro:
  - Better Performance
    - near by datacenter better serves user request 
  - Tolerance of datacenter outages
    - if one datacenter fails
  - Tolerance of network problems
    - network goes down between datacenter
 - Tungsten Replicator of MySQL, BDR for PostgreSQL, GoldenGate for Oracle
cons
  - handle write conflict
  - auto-incrementing, triggers and integrity constraints can be prblematic

### Handling Write Conflict
- Confict Avoidance
- Converging toward a consistent state
- custom conflict resolution logic
  - on write
    - calls conflict handler when system detect a conflict
  - on read
    - retains all conflict in data structure and sends back on read
    - application resolves the conflict either automatically or manually and sends the result back to save data
  - some other ways
    - Conflict-free replicated datatype (CRDT) (2 way conflict resolution)
      - data structure than can concurrently be updated by multiple users and automatically resolve conflict in sensible ways
    - Margable persistent data structure (3 way conflict resolution)
      - git like version control
    - Operational transformation
      - concurrent editing of an ordered list of items.

## Leaderless Replication
- Dynamo, Riak, Cassandra and Voldemort
- read request are sent to several nodes in parallel
- If client gets different responses, then version number is used to find the most up to date value
- Read Repair
  - when client gets stale data from any one replica then client then updates the replica with up to date data.
- anti-entropy
  - a background process constantly looks for differences in data between replicas and update the replica with stale data with up to date data, but there would be significant delay

Quorums for reading and writing
- n replicas, with w write acknowledgement and r nodes return read query then
- in order to correctly get up to date data
  - w + r > n (quorum read and writes)
- quorums are not majority, but ensures the condition that at least one node overlap for read and write so that client can get latest version data.


### Sloppy quorum and hinted handoff
- sloppy quorum: accept writes and write them to some nodes that are reachable but aren't among the n nodes on which the values usually lives
- hinted handoff: any writes that one node temporarily accepted on behalf of another node are sent to the appropriate "home" nodes.
- not a quorum but assurance of durability



