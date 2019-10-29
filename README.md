# Clone of Twitter's PWA

This project aims to replicate Twitter's PWA, both the frontend (React) and backend (NodeJS) are included.

## Preparations

The following tech should be installed prior to getting started:

* node v10.17.0
* npm v6.11.3
* docker v19.3.4

## Getting Started

Two environment files are needed in order for the backend to work:

* ./docker/mongo-variables.env
* ./server/.env

Examples of each are included, the only requirements are do **not** commit the actual files you use and ensure the mongodb username and password listed in each are the same, this will ensure the backend can connect to MongoDB.

Clone the project and open a terminal at the root of the project, then run the following:

```bash
npm run setup
```

This installs node modules for the main project at the root, the app project, and the server project in that order. Then in separate terminals, run the following:

```bash
# TERMINAL 1
npm run containers
```

```bash
# TERMINAL 2
npm run server
```

```bash
# TERMINAL 3
npm run app
```

**Terminal 1** will setup and run a MondoDB Docker container

**Terminal 2** will run the NodeJS server

**Terminal 3** will run the ReactJS development enviroment

If all terminals are running, then Terminal 3 should of opened a browser window to localhost and you should be able to start interacting with the app.

## Testing

Both the app and server portions of the project utilize some testing using jest. When developing, simply run...

```bash
npm run test
```
in either **./app/** or **./server/** and jest will start watching/testing your changes. **NOTE:** The server relies on MongoDB to start properly so ensure the container is running prior to testing the backend.