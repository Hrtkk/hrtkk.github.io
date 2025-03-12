## Flink Architecture



### Task Execution
- A task manager can execute several task
  - For same operator (Data Parallelism)
  - For different operator (Task Parallelism)
  - For different application (Job Parallelism)


#### TaskManager Failure
- In case of TaskManager failure, we loose complete set of processing slots offered by that Task manager.
- If number of currently available slots is less than the task parallelism, then the Job Manager will ask the Resource Manager to provide more processing slots.
- If Resource Manager fails to provide new slots, then Job Manager can't run that application, and will have to wait according to restart strategy before next restart attempts. 

#### JobManager Failure
- A Job manager handles the execution of tasks for streaming application.
- When running in high availability mode, the Job Manager writes the Job Graph and all the required metadata such as JAR files and its dependency in to remote persistent locations.
- While execution, Job Manager receives a state hanlde(a reference to remote location for storing data) of individual tasks checkpoints. Upon completion, all tasks writes their state to that remote location and the Job Manager writes the state handles to the remote storage and also writes a pointer to that location to Zookeeper.
- Hence, all data that is required to recover from a JobManager failure is stored in the remote storage and Zookeeper holds the points to the storage locaiton.
- When a JobManager fails, all tasks that belongs to its application are automatically cancelled and a new job manager takes over the work.

## Data Transfer in Flink
- TaskManagers take care of shipping data from sending tasks to receiving tasks. 
- The network component of a TaskManager collects the records in buffer before shipping data.
- A TaskManager needs one dedicated network buffer for each receiving task that any of its tasks needs to send data to.
- With a shuffle or broadcast connection, each sending task needs a buffer for each receiving task; the number of required buffers is quadratic to the number of the involved operators.

### Credit Based Flow Control
- A receiving task grants some credit to a sending task, the number of network buffers that are reserved to receive its data. Once a sender receives a credit notification, it ships as many buffers as it was granted and the size of its backlog-- the number of network buffers that are filled and ready to be shipped.
- The receiver then utilizes the sender's backlog size info to prioritize the next credit grants for all its connected senders.

### Task Chaning
- Reduces the overhead of local communication under certain conditions. 
- When two or more operators are configured with the same parallelism and connected by local forward channels, the functions of the operators are fused into a singel task that is executed by a single threa.
- Records that are produced by a function are separately handed over to the next function with a simple method call which ultemately reduces the overhead of serialization and deserialization.

## Event Time Processing


## State Management
- In Flink, state is always associated with a specific operator
- In order to make Flink's runtime aware of the state of an operator, the operator needs to register its state.
- There are two types of state
  - Operator state
    - Operator state is scoped to an operator task and cannot be accessed by another operator.
    - Flink offer three primitives for operator state
      - List state
      - Union list state
      - Broadcase state
  - Keyed state
    - maintained and accessed with respect to a key defined in the records of an operator's input stream.
    - Flink maintains one state instance per key value and partitions all records with the same key to the operator task that maintains the state for this key.
    - Primitives offered for keyed state
      - Value state
      - List state
      - Map state

### State Backend
- A state backend is responsible for
  - local state management
    - stores all keyed state and ensures the accesses are correctly scoped.
  - checkpointing state to a remote location
    - takes care of checkpointing the state of a task to a remote and persistent storage.

### Scaling stateful operator
- Operators with keyed state are scaled by repartitioning keys to fewer or more tasks.
- Flik avoids redistribution of keys, instead it organizes keys into key groups.
- A key group is a partition of keys and Flink's way of assigning keys to task.
- Operators with operator list state are scaled by redistributing the list entries. The list entries of all parallel operator tasks are collected and evenly redistributed to a smaller or larger number of tasks.
- Operators with operator union list state are scaled by broadcasting the full list of state entries to each task.
- Operator with operator broadcast state are scaled up by copying the state to new tasks.

## Checkpoints, Savepoints and State Recovery



