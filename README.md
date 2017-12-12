### The goal of this application

Our goal is to build a basic banking application that can handle various aspects of a user’s finances. In this case, we’ll focus on the actions that occur when a user attempts to withdraw money from their account and all the actions that happen behind the scenes, like making sure every transaction is captured and stored.

### The architecture

The architecture we’re about to present fulfills four key requirements:

- Unidirectional state flow to go along with RxJS 
- Immutable and side effect–free, or functional 
- Unopinionated and lightweight 
- Decoupled state and UI effects so that the business logic is agnostic to the view technology

The 3R architecture below that shows the hierarchy of the different layers of the system and the purpose each serves:

UI ---------------> React --+
                            |
State management -> Redux --+--> decoupled
             |              |
Core logic --|----> RxJS  --+
       |     |
       +-----+----> Asynchronous middleware

