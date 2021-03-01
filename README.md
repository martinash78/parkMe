# parkMe

This purpose of this app is to allow owners of parking spaces to be able to offer their spaces as available so that
other users of the app who do not have a reserved space can claim the space and use it as their own.

### Env 

Make sure to copy `.env.example` to `env` and add in the relevant values.


### Database Seeding

Install MongoDB using the guide here https://docs.mongodb.com/guides/server/install/

Use the following command to initially seed the database, you will need mongoimport installed. You can find more info here https://docs.mongodb.com/database-tools/installation/installation/

`mongoimport --db parkMe --collection users data/users/user.json`

This will give you a default admin user of `admin@admin.com` with the password `password`

Admin users can create spaces and add new users.

### Running

To run the app locally just run the following commands:

* docker-compose build
* docker-compose up -d 

The parkMe Api will load at http://localhost:8081. 

The frontend will load at http://localhost:8080. 

Mongo will load at localhost:27017. [Compass](https://www.mongodb.com/products/compass)  is a nice tool to view Mongo databases, it should work directly with a default localhost connection. No password is needed.
 
Swagger UI will load at http://localhost:8082, all calls can be tested via this UI.

### Tests

You can run tests by running the following commands

* npm run test - All tests
* npm run test unit - All unit tests
* npm run test int - All integration tests

### Postman

You can download a Postman collection here:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5ed2635b046ae90d4cfd#?env%5BfreeSpace%5D=W3sia2V5IjoiYWRtaW5CZWFyZXJUb2tlbiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJyYW5kb21Vc2VyTmFtZSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJ1cmwiLCJ2YWx1ZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MSIsImVuYWJsZWQiOnRydWV9XQ==)

