# Vanchor

Personal tools

## Client

## Server

`nodemon server.js`

## Docker

```bash
docker network create mongo-express
docker run --name mongo-db -d --network mongo-express -p 27017:27017 mongo
docker run -it -d --rm --network mongo-express --name mongo-express --link mongo-db:mongo -p 8082:8081 mongo-express
```
