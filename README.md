# parkMe

### Env 

Make sure to copy `.env.example` to `env` and add in the relevant values.


### Database Seeding

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

