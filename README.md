# Collaborative Online Coding System
## Overview
Collaborative Online Coding System is a full-stack system supporting collaborative code editing, compiling and execution.
## Major Use Cases
1. User can use interactive code editor to edit code. Supported languages are Java, C++ and Python.
2. Multiple users can edit the same piece of code simultaneously. Each user’s change can be seen and applied to every other user’s code immediately.
3. User can run the code by clicking "run" button. The execution result will be displayed to user.
4. User can browse pre-stored coding problem list.
5. User can get details of a specific coding problem by clicking the problem in the list.
6. Admin can manually add new problem.
## High-level Stack Diagram
| Stack         | Technologies  |
| ------------- |:-------------:|
| Frontend-client | Angular, Socket.io |
| Frontend-server | Node.js, Socket.io, Redis, MongoDB, Nginx|
| Backend(executor) | Nginx, Flask, Docker|
## Design
### Collaborative Editor
I am using [socket.io](https://socket.io) as the communication protocol between client and server. The reasons are:
* Client-server communication is heavy;
* Full-duplex asynchronous messaging is prefered;
* WebSockets pass through most firewalls without any reconfiguration.
### Client-side Editor
#### Ace Editor
Here I have two options to choose an editor for browser: [Ace](https://ace.c9.io) and [CodeMirror](https://codemirror.net). They are both Javascript-based editor for browser and support source code editing. They both support multiple languages, color themes, programing APIs for advanced usage.

Programing API is the top-1 feature I considered. The project needs to dynamically get and change the status of the editor. These include getting the change of the content, applying the change to the current content, and so on. Both Ace and CodeMirror expose a good set of APIs.

I chose Ace as it has been proven to be a stable editor because it is adopted by [Cloud9 IDE](https://c9.io/login). It is easier to get help from community.
### Server-side
#### Editing Session



