# parkMe

To run the app locally just run the following commands:

* docker-compose build
* docker-compose up -d 

The main parkMe app will load at http://localhost:8080. Running `tsc -w` from the local root folder will recreate files in the dist folder whenever the ts scripts are updated. This will cause nodemon to reload the app within the container.

Mongo will load at localhost:27017, [Compass](https://www.mongodb.com/products/compass)  is a nice tool to view Mongo databases and it should work directly with a default localhost connection. No password is needed.
 
Swagger UI will load at http://localhost:8081

