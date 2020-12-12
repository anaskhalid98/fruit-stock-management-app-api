## Stock management API with nodejs, expressJs, mongoDB
This API is a backend app for [ReactJs app](https://github.com/anaskhalid98/fruit-stock-management-app).
![](assets/fruit%20stock%20management%20app.gif)

### Technologies :
 * nodejs
 * expressjs
 * mongoDB
 * jwt
    
You can access the api under localhost:3000 

| Methods | Urls | Actions |
| --- | --- | --- |
| `POST` | /api/auth/signup | Create a new user |
| `POST` | /api/auth/signin | Login to the app  |
| `POST` | /api/addStock | Create stock   |
| `POST` | /api/TransferMerchandise| Send goods from place A to B  |
| `GET` | /api/Stock | Get current user stock  |


#### To start the application

Step 1: start mongodb and mongo-express

    docker-compose -f docker-compose.yaml up
    
_You can access the mongo-express under localhost:8080 from your browser_
    
Step 2: in mongo-express UI - create a new database "fruitmark"

Step 3: in mongo-express UI - create a new collection "users"  and "stocks" in the database "fruitmark"       
    
Step 4: start node server 

    node server.js
    
You can access the api under localhost:3000 


