# Vanchor

**Just to train me**

- Vue 3
- Express
- Mongo (with mongoose and joi)
- JWT
- morgan

Dashboard with my personal tools:

- auth with JWT
- timer, pomodoro, stopwatch
- todo
- notes
- algo code library (Vanchor)
- Kanban

### To do

 - [ ] Vanchor
 - [ ] Kanban
 - [ ] Dashboard (currently empty)
 - [ ] init database
 - [ ] unit test
 - [ ] Redis

## Client

### Start
`npm run serve`

## Server
### ENV

Add env file in the server folder:
```
PORT='3000'
MONGO_URI='mongodb://localhost:27017'
DB_NAME='vanchor'
ACCESS_TOKEN_SECRET='....'
REFRESH_TOKEN_SECRET='....'
```

### Start
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
