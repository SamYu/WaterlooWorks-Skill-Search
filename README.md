# WaterlooWorksPro [WIP]
WaterlooWorks API and client

**Technologies Used**
Node.js, Express.js, MongoDB, Mongoose.js, React, Redux, Docker

## How to develop locally

#### Setting up the database
1. Make sure you have Docker installed and `docker pull mongo` to get latest MongoDB image
2. `docker run -p 27017:27017 -v /data/db:/data/db --name mongodb -d mongo` to initialize container

*Useful Commands*:
- Start database: `docker start mongodb`
- Stop database: `docker stop mongodb`
- Access mongoDB CLI: `docker exec -it mongodb bash` and then `mongo` to start mongoDB CLI
- List all running docker containers: `docker ps -a`

#### Running the server for development
`npm run watch` in the root directory

#### Running the React app for development
1. `npm run start` in `client` directory
2. Open `http://localhost:3000` in your browser to view the React app

## Deploying to production
Work In Progress
