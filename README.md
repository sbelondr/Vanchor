# Vanchor

**Just to train me**

- Vue 3
- Express
- Mongo

Dashboard with my personal tools:

- timer, pomodoro, stopwatch
- todo
- notes
- algo code library (Vanchor)
- Kanban

### Bug / to do

 - [ ] beforeunload not working correctly (save data before leaving)
 - [ ] Vanchor
 - [ ] Kanban
 - [ ] Dashboard (currently empty)
 - [ ] init database
 - [ ] unit test

## Client

`npm run serve`

## Server

`nodemon server.js`

## Database

### Docker

```bash
docker network create mongo-express
docker run --name mongo-db -d --network mongo-express -p 27017:27017 mongo
docker run -it -d --rm --network mongo-express --name mongo-express --link mongo-db:mongo -p 8082:8081 mongo-express
```

### MCD

![MCD](resources/diag.svg)
