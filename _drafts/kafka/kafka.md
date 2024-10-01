* Apache Kafka Raft (KRaft) is the consensus protocol that was introduced to remove kafak's dependency on Zookeeper for metadata management.
* Zookeeper being a seperate system, with its own configuration file syntax, management tools and deployment patterns, make kafka complicated.
* KRaft enables right sized clusters, meaning clusters that are sized with the appropriate number of broker and compute that satisfies a use-case's throughput and latency requirements, to scale up to millions of partitions.
* Metadata failover is near instantaneous with KRaft.
* Kraft provides a single system to manage since KRaft is part of Kafka itself.