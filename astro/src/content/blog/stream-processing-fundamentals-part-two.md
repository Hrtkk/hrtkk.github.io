---
title: "Fundamentals on Stream Processing"
description: "Time semantics, watermarks, state, and what consistency actually means when a stream job fails."
date: 2024-09-27 14:25:27 +0530
category: "Stream Processing"
pillar: "distributed-systems"
tags: ["stream-processing", "watermarks", "state", "fault-tolerance"]
status: "archived"
---

## Fundamentals on Stream Processing: Part 03
- There are many concepts we need to aware of before we jump into the world of Stream Processing.
Topics that we will be discussing
  - Time Semantics
    - Processing Time
    - Event Time
    - Watermarks
  - State and Consistency Models
  - Failures

## Time Semantics
- Processing Time
  - Processing Time is the time of machine on which operator is processing the particular event.
  - Processing Time window inclues all the events that arrives at the window operator within a time period on that machine.
- Event Time
  - Event Time is the time when an event in the stream actually happened. Event Time is the timestamp assigned to event at the time of its creation.
  - The results of operation based on event time are predictable and also deterministic and will yield the same result no matter how it is processed.
  - But handling delay is a quite challenge, which needs to take care while dealing with event time.

## Watermarks
- When we talk about event time, we also need to take care of the delays. In real world, an out of order events are ubiquitous. This makes handling of events based on event time abit challenging.
- Delays on event time add uncertainity on when to trigger an event-time window for processing.
- Watermarks are basically a point in time, when we say, it enough, and we can't wait any longer and we accept that there will be no events that are gonna come with event time less than current point in time.
- In other words, at time ***t*** we assume that, all the future events will have event time ***t'*** > ***t***
- It doesn't actually solve the problem, but provides a way to deal with delays. Watermarks provide a configurable tradeof between result confidence and latency.


### State and Consistency Models 
In stream processing managing state is a crucial task. Stream processing usually involves unbounded datasets.
Extracting any information will require not only current event, but also the result of all or may be the subset of previoulsy processed stream.
Since we are dealing with unbounded dataset, we will also keep an eye on the size of data getting stored.
Some kind of summary or synopsis of the events can help deal with growing data size.
Some key challenges
- State Management
  - How to protect data on concurrent update
- State Partitioning
  - Data processing result depends on processing of incoming event and the stored results as well.
  - State Partitioning add complexities for parallelization
  - in many cases, we can partition data based on key and manage paritioned state separately
- State Recovery
  - In case of failure, maintaining result correct becomes difficult.

### Failures
- Result Guarantees
  - At-Most-Once: 
    - When a task fails, do nothing to recover lost state but replay the lost events
    - This type of guarantee is also called "no-guarantee"
  - At-Least-Once: 
    - In this scenario, we expect that no event get lost and each and every event got processed.
    - Duplicate processing might be acceptable if application correctness only depends on the completeness of information.
    - either you need to replay event from source or from some buffer.
    - Persistent event logs write all events to durable storage, so that they can be replayed if a task fails.
    - Use record acknowledgement, which stores every event in buffer untill its processing has been acknowledged by all tasks in the pipeline.
  - Exactly-Once
    - This guarantee requires both at-most-once and at-least-once.
    - After recovery, stream processor should know whether an event update has alreay been reflected on the state or not, which can be achieved by Transactional update.
    - Flink uses lightweight snapshotting mechanism to achieve this guarantee.
  - End-to-end exactly-once
    - End-to-end guarantee would be equivalent to weakest guarantee of all individual components.
  

prev << [Fundamentals on Stream Processing: Part 02](/blog/2024/09/27/Fundamentals-Part-one.html)
