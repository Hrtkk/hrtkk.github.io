## Partitioning by key value data
  ### Partitioning by key range
  - assign continuous range of keys to each partition.
  - To distribute data evenly, the partition boundaries need to adapt to the data
  - con
    - can create hotspot, like if key is timestamp, then all data will go to same database with parition range for today's date
  - you can add some prefix, in that case you will have to aggregate data from each databse.
  
  ### Partitioning by Hash Key
  - you will need to define a good and consistent hash function.
  - can assign range of hashes to partition
  con:
    - we lose key-range partitioning
    - the ability to do efficient range queries.
    - Keys are now distributed and sort order is lost.
    - Range queries are not supported in some db: Riak, Couchdb or Voldemort
    - for mongodb, any range query has to be sent to all paritions
  - Cassandra achieves a compromise between the two paritioning strategies.
  - One can declare a _compound primary key_ consisting of several columns. (user_id, update_timestamp)
  - Only the first part of that key is hashed to determine the partition, but the other columns are used as a concatenated index for sorting the data in Cassandra SSTable.
  ### Skewed Workloads and Relieving Hot Spots
  - hot keys can use prefixed or suffixed with 1 or 2 digit random number will help in distributing data
  - but splitting write across different keys, result in extra work for read and also require additional bookkeeping.

## Partitioning and Secondary Indexes
- Document based partitioning
  - scatter and getter
  - each partition is complete seperate and each maintains its own secondary index
- Term based partitioning
  - construct a global index that covers data in all partitions.
  - a global index must also be partitioned
  - the word term comes from full-text indexes, where the term are all the words that occur in a document.
  - makes read more efficient but write becomes slower and complicated.
  - write to single document will affect multiple partitions of the index


## Rebalancing Partitions
### Fixed number of partitions
- create large number of partitions for some number of nodes, say 1000 partitions for 10 nodes
- assign partitions to each node evenly.
- if a new node is added, the new node can steal a few partitions from every existing node until partitions are fairly distributed again and reverse when a node is removed from cluste.
- here partition assignement is chaning ans also complete partition have to move which might take some time.
- chooing the right number of partitions becomes critical.

### Dynamic Partitioning, Fixed partition size
- HBase and RethinkDB create partitions dynamically.
- When a partition grows to exceed a configured size, it is split into two partitions so that approximately half of the data ends up on each side of the split.
- if lots of data is deleted and a parition shrinks below some threshold, it can be merged with an adjacent partition.
- the number of partition adapts to the total data volume.
- pre-splitting: allow an initial set of partitions to be configured on an empty database.


