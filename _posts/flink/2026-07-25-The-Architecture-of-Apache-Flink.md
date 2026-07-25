---
title: "The Architecture of Apache Flink"
date:   2026-07-25 07:30:00 +0530
author: Hritik Kumar
category: blog
tags:
  - Blog
  - Flink
---
# The Architecture of Apache Flink

In the previous posts we covered the fundamentals of stream processing. Now let's look at how Apache Flink actually runs your application: how tasks are executed, how data moves between them, what happens when things fail, and how Flink manages state.
<!--more-->

### Task Execution
- A TaskManager can execute several tasks at the same time:
  - Tasks of the **same operator** (data parallelism)
  - Tasks of **different operators** (task parallelism)
  - Tasks of **different applications** (job parallelism)

#### TaskManager failure
- If a TaskManager fails, we lose the complete set of processing slots offered by that TaskManager.
- If the number of currently available slots is less than the application's parallelism, the JobManager asks the ResourceManager to provide more processing slots.
- If the ResourceManager cannot provide new slots, the JobManager can't run the application and waits, according to the restart strategy, before the next restart attempt.

#### JobManager failure
- The JobManager coordinates the execution of a streaming application.
- When running in high-availability mode, the JobManager writes the JobGraph and all required metadata — such as the application's JAR file and its dependencies — to a remote, persistent storage location.
- During execution, the JobManager receives a *state handle* (a reference to the remote location where data is stored) for the individual task checkpoints. When a checkpoint completes, all tasks have written their state to that remote location; the JobManager stores the state handles in remote storage and writes a pointer to that location into ZooKeeper.
- Hence, all the data required to recover from a JobManager failure lives in remote storage, and ZooKeeper holds the pointer to it.
- When a JobManager fails, all tasks belonging to its application are automatically cancelled, and a new JobManager takes over using that pointer.

## Data Transfer in Flink
- TaskManagers take care of shipping data from sending tasks to receiving tasks.
- The network component of a TaskManager collects records in buffers before shipping them — records are not shipped one by one.
- A TaskManager needs one dedicated network buffer for each receiving task that any of its tasks sends data to.
- With a shuffle or broadcast connection, each sending task needs a buffer for each receiving task — so the number of required buffers grows quadratically with the parallelism of the involved operators.

### Credit-based flow control
- A receiving task grants *credit* to a sending task: the number of network buffers reserved to receive its data.
- Once a sender receives a credit notification, it ships as many buffers as it was granted, along with the size of its **backlog** — the number of network buffers that are filled and ready to be shipped.
- The receiver uses the senders' backlog sizes to prioritize which sender gets the next credit grant, so busy senders get drained first.

### Task chaining
- Task chaining reduces the overhead of local communication under certain conditions.
- When two or more operators are configured with the **same parallelism** and connected by **local forward channels**, their functions are fused into a single task executed by a single thread.
- Records produced by one function are handed to the next function with a simple method call, which eliminates the serialization/deserialization and network-buffer overhead entirely.

## State Management
- In Flink, state is always associated with a specific operator. For Flink's runtime to know about an operator's state, the operator has to register it.
- There are two types of state:
  - **Operator state**
    - Scoped to an operator task — it cannot be accessed by another task or operator.
    - Flink offers three primitives: *list state*, *union list state*, and *broadcast state*.
  - **Keyed state**
    - Maintained and accessed with respect to a key defined in the records of the operator's input stream.
    - Flink maintains one state instance per key value, and partitions all records with the same key to the operator task that maintains the state for that key.
    - Primitives offered: *value state*, *list state*, and *map state*.

### State backends
A state backend is responsible for two things:
- **Local state management** — it stores all keyed state and ensures accesses are correctly scoped.
- **Checkpointing state to a remote location** — it takes care of writing the state of a task to remote, persistent storage.

### Scaling stateful operators
- Operators with **keyed state** are scaled by repartitioning keys across fewer or more tasks. Flink avoids redistributing individual keys: it organizes keys into **key groups**. A key group is a partition of keys and is Flink's unit for assigning keys to tasks.
- Operators with **operator list state** are scaled by redistributing the list entries: the entries of all parallel tasks are collected and evenly redistributed across the new number of tasks.
- Operators with **union list state** are scaled by broadcasting the *full* list of state entries to every task.
- Operators with **broadcast state** are scaled up by copying the state to the new tasks.

In a follow-up post we will look at event-time processing in depth, and at how checkpoints and savepoints make all of this state recoverable.

prev << [Fundamentals on Stream Processing: Part 03](/blog/2024/09/27/Fundamentals-Part-two.html)
