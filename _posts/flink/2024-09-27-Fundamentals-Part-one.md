---
title: Fundamentals on Stream Processing
date:   2024-09-27 14:25:27 +0530
author: Hritik Kumar
category: blog
tags:
  - Flink
  - Blog
---
## Fundamentals on Stream Processing: Part 02
- There are many concepts we need to aware of before we jump into the world of Stream Processing.

### Brief on Stream Processing
- Stream Processing engine usually perform three types of operations
  - Ingestion (Input)
    - Fetching Raw data from external source (Data Source)
  - Processing (Transformations, Aggregation, etc).
  - Sinking (Output)
    - Dumping processed and formatted data to external s̀ystem (Data Sink).
- We combine these operation into single flow called DataFlow processing graph.
<!--more-->
- These processing are of two nature
  - Stateless
    - In Stateless operations, we do not need to maintain any internal state. The events which are being processed are independent of any previous events processed. So there is no need to maintain history.
    - Stateless operations are easy to parallelize, since their processing is independent of each other.
  - Stateful
    - In Stateful operation, We need to maintain historical information about previously processed events.
    - It is quite challenging to parallelize and process them in fault tolerant manner because of state management. As in case of failure, we need to recover them reliably.
- Data Transformation
  - In order to transform data, we need to deploy operating units called **Operators**.
  - Operators can access multiple inputs and produce multiple output streams.
  - They can modify the structure of the dataflow graph by either splitting a stream into multiple stream or merging streaming into a single flow.
- Window Operations
  - Window operation are needed when we are interested in recent set of data rather complete history, like analysing current road traffic congestion. Here we would be more interested in data of last 30 min of 1 hours. previous days data won't do good to out dataset to give real time picture of traffic congestion.
  - There are various parameters we need to take care of while working with window operators semantics.
    - What are the conditions of event partitions into windows or buckets.
    - window policies, when to create new bucket, when to start processing bucket.
    - Some of the common window types
      - Tumbling Window
        - Assign events into non overlapping buckets of fixed size.
        - examples: Count based, Time based.
      - Sliding Window
        - Assign events into overlapping buckets of fixed size.
        - window length and sliding length are important parameters.
      - Session Window
        - Assign events on user sessions
        - helpful in user behavior analysis


prev << [Introduction on Stream Processing: Part 01](/blog/2024/09/26/Stream-processing-introduction.html)

next >> [Fundamentals on Stream Processing: Part 03](/blog/2024/09/27/Fundamentals-Part-two.html)