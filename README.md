# RSS FEED App

### Used technology stack and libraries

- Next JS
- React
- Bootstrap
- Mongodb
- Node


### Development environment

- Set up a Mongodb database 
    - Install mongo db in local machine and create database `rss`
    - Or create a docker container using `docker-compose.ym` file located at `./other/mongo`
    - Or run following docker command to create the image
        ```
        docker run -p 27017:27017 \
            -e MONGO_INITDB_ROOT_USERNAME=root\
            -e MONGO_INITDB_ROOT_PASSWORD=password\
            -e MONGO_INITDB_DATABASE=rss --name mongo mongo
         ```


- Rename `.env.example` to `.env` and replace MongoDB url.
- Install dependencies using
  ```      
  npm install
  ```
- Run app using 
  ```      
  npm run dev
  ```
- Visit http://localhost:3000


### Running using docker-compose

- Rename `.env.example` to `.env`.
- Execute following command
  ```
  docker-compose up
  ```


  