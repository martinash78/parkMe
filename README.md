# parkMe

Make sure to copy `.env.example` to `env` and add in the relevant values.

To run the app locally just run the following commands:

* docker-compose build
* docker-compose up -d 

The main parkMe app will load at http://localhost:8080. 

Mongo will load at localhost:27017, [Compass](https://www.mongodb.com/products/compass)  is a nice tool to view Mongo databases and it should work directly with a default localhost connection. No password is needed.
 
Swagger UI will load at http://localhost:8081

Use the following command to initially seed the database, you will need mongoimport installed. You can find more info here https://docs.mongodb.com/database-tools/installation/installation/

`mongoimport --db parkme --collection users data/users/user.json`

This will give you a default admin user of `admin@admin.com` with the password `password`

Admin users can create spaces and add new users.

