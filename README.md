# tweet_backend_mock

This project is to create a simple social media application with RESTful API.

## Technical requirements

The app was created for Speer.io's Challenge.

- User registration using unique username and a password. ✅
- User login (Including session maintenance using any means you’re comfortable with). ✅
- Create, read, update, delete tweet. ✅

## Setups

```
$ git clone git@github.com:BENcao318/tweet_backend_mock.git tweet
$ cd tweet
$ npm install
```

```
- You would need sequelize to create the database and adding seeds
- We recommand use sequelize cli to easily implement above process
- You might also need to change the username and password in server/config/config.json in order to connect to your database. We use postgreSQL for this application
$ cd tweet
$ npm install --save-dev sequelize-cli
$ sequelize db:create
$ sequelize db:migrate
$ sequelize db:seed:all
- Above commands will help setup the tables and add seeds in the database.
```

## API Endpoints

- Connect : `GET http://localhost:8080/ ` //Receive message string: "Hi"
- Create Account : `POST http://localhost:8080/users/register` //If success, receive status 200 and message string: Signup success. If user exists, receive status code 403 and message string: Username already exist
- Sign in Account : `POST http://localhost:8080/users/signin ` //If success, receive status 200 and message string: Login success
- Create new Tweet : `POST http://localhost:8080/tweets/new` //If success, receive status 200 and message string: Tweet create success
- Update Tweet : `POST http://localhost:8080/tweets/update` //If success, receive status 200 and message string: Completed Task update success
- Delete Tweet : `DELETE http://localhost:8080/tweets` //If success, receive status 200 and message string: Successfully delete the tweet
