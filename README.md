# RSS FEED App

### Used Technologies

- Next JS
- React
- Bootstrap
- Mongodb
- Node
- Graphql
- ExpressJS


### Development environment

- Set up a Mongodb database 
    - Install mongo db in local machine and create database `rss`
      - Or run following docker command to create the docker container of mongodb
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

#### For production 

- Install dependencies using
  ```      
  npm install
  ```
- Build app using 
  ```      
  npm run build
  ```
- Run production app using following command
  ```      
  npm run start
  ```




### Running using docker-compose

- Execute following command
  ```
  docker-compose up --build
  ```
- Visit http://localhost:3000

### Graphiql UI


 Visit http://localhost:3000/graphql
  