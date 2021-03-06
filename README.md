# WaterlooWorks Skill Search

A Node API and React client that scrapes jobs from the University of Waterloo’s co-op job portal and presents personalized job postings based on the user’s unique skillset.

![Animated demo](images/demo.gif)

## How it works
Job postings on WaterlooWorks are scraped using a Puppeteer, headless chrome Node.js API and the results are parsed and stored into a MongoDB database for caching.

**Technologies Used**
- **Backend**: Node.js, Express.js, MongoDB, Mongoose.js, Puppeteer
- **Frontend**: React, Redux
- **Infrastructure**: AWS EC2, Nginx

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

1. `ssh` into the EC2 instance
2. Fetch latest from repo with `git pull`
3. Build the frontend: `npm run build` while in `client/`
4. Start the server: `pm2 start npm -- run prod --`

