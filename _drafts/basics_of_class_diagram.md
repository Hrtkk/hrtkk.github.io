

## Basics of Object Oriented Programming


### Basics of Class Relationships
  - Association
    - The most basic form of relationship where one object interact with another object. But they are independent of each other.
    - Kind of ***"uses"*** relationship.
    - **Example**: A Teacher and a student have an association relationship. Where a teacher teaches a student and student learns from teacher. Existence of both are independent of each other.

    ```
      class Teacher {
        private String name;
        public void teach(Student student);
      }
      class Student {
        private String name;
      }
    ```
    
  - Aggregation
    - Aggregation relationship is also a weak relationship which represents "has-a" relationship.
    - In this kind of relationship, Parent object has reference to its child objects but they are not tightly coupled. If we destroy the parent, child will still exist meaning parent does not control the lifetime of its children objects.
    - for example: School and Students.
  - Composition
    - Composition is a stronger form of association in which the parent object controls the lifecycle of its children objects.
    - It's kind of "part-of" relationship.
    - for example: Books and pages.
  - Dependency
  - Inheritance or (Generalization)
    - It is a relation between a Generic class and its specialized classes.
    - is is represented as "is-a" relationship
  - Realization