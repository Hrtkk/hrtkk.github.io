---
title: "Database Partitioning: Splitting Data Without Splitting Headaches"
date:   2026-07-25 07:00:00 +0530
author: Hritik Kumar
category: blog
tags:
  - Blog
  - System Design
  - DDIA
---
# Database Partitioning

When a dataset grows beyond what a single machine can store or serve, we split it across multiple nodes. This is called **partitioning** (or *sharding*). The goal is to spread both the data and the query load evenly — and the interesting problems show up when the spread is not even.

In this post, we will look at the main partitioning strategies, how secondary indexes interact with partitioning, and how partitions are rebalanced as the cluster grows.
<!--more-->

## Partitioning of Key-Value Data

### Partitioning by key range
- Assign a continuous range of keys to each partition.
- To distribute data evenly, the partition boundaries need to adapt to the data.
- **Downside — hotspots**: if the key is a timestamp, all writes for today go to the same partition, so one node does all the work while the rest sit idle.
- A common workaround is to add a prefix (for example, a sensor name before the timestamp), but then a query for "everything today" has to fetch from each partition and aggregate the results.

### Partitioning by hash of key
- Define a good hash function — deterministic, and spreading keys evenly — and assign a range of *hashes* to each partition.
- **Downsides**:
  - We lose key-range partitioning, and with it the ability to do efficient range queries — keys are now scattered and the sort order is lost.
  - Some databases simply do not support range queries on hashed keys (Riak, Couchbase, Voldemort). In MongoDB, a range query has to be sent to all partitions.
- **Cassandra achieves a compromise** between the two strategies:
  - You can declare a *compound primary key* consisting of several columns, e.g. `(user_id, update_timestamp)`.
  - Only the first part of the key is hashed to determine the partition; the remaining columns are used as a concatenated index for sorting the data inside Cassandra's SSTables.
  - So you can efficiently scan a range of timestamps *for one user*, even though users themselves are spread by hash.

### Skewed workloads and relieving hotspots
- Even with hashing, a single celebrity key can become hot. A trick is to prefix or suffix hot keys with a small random number (say, 1–2 digits), which spreads the writes across many keys.
- The cost: reads now have to fetch all the variants and combine them, and you need extra bookkeeping to remember which keys were split.

## Partitioning and Secondary Indexes
Secondary indexes don't map neatly to partitions. There are two approaches:

- **Document-based partitioning (local indexes)**
  - Each partition is completely separate and maintains its own secondary index, covering only its documents.
  - Reads must query *all* partitions and combine the results — the **scatter/gather** approach, which makes secondary-index reads expensive.
- **Term-based partitioning (global indexes)**
  - Construct a global index that covers data in all partitions. The global index itself must also be partitioned (otherwise it becomes the bottleneck).
  - The word *term* comes from full-text indexes, where the terms are all the words that occur in a document.
  - This makes reads more efficient — you only hit the partition holding the term — but writes become slower and more complicated: a write to a single document may affect multiple partitions of the index.

## Rebalancing Partitions
Over time you add nodes, remove nodes, and data grows. Moving data around to keep the load even is called **rebalancing**.

### Fixed number of partitions
- Create many more partitions than nodes, say 1,000 partitions for 10 nodes, and assign partitions to nodes evenly.
- If a new node is added, it *steals* a few partitions from every existing node until partitions are fairly distributed again; removing a node works in reverse.
- Only the partition **assignment** changes — but entire partitions have to move, which can take time.
- Choosing the right number of partitions up front becomes critical: too few limits future scaling, too many adds overhead.

### Dynamic partitioning (fixed partition size)
- HBase and RethinkDB create partitions dynamically.
- When a partition grows beyond a configured size, it is split into two, with roughly half of the data on each side. Conversely, if lots of data is deleted and a partition shrinks below a threshold, it is merged with an adjacent partition.
- The number of partitions adapts to the total data volume.
- **Pre-splitting** allows an initial set of partitions to be configured on an empty database, so a brand-new table doesn't start as a single hot partition.

Partitioning is one half of scaling a database — the other half is keeping copies of each partition, which we cover in the companion post on [data replication](/blog/2026/07/25/Data-Replication.html).
