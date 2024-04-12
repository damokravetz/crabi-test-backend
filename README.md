# crabi-test-backend
**How to run the application**
1. Clone the repo into your machine.

2. Create a .env file and copy the following values:

```
MONGODB_URI=mongodb://localhost:27017/crabi
JWT_SECRET='clave';
PLD_URL=http://44.210.144.170/check-blacklist
```

3. Download Mongo Community edition to run a local database here https://www.mongodb.com/try/download/community.

4. Open Mongo Community, use default settings and select "connect". Then create database named "crabi" with a "users" collection.

5. Run the command "npm install" on the root folder of the project.

6. Run the command "node index.js" on the root folder of the project.

7. If you have a node version issue, you may need to update to Node.js version 20.12.1 or higher. You can download it here https://nodejs.org/dist/v20.12.1/.
You can also use Node Version Manager to download an manage node versions if you had an older version preinstalled.


# API endpoints

### POST /api/register
Register new user.

**Request body example**

```
{
    "name":"Joaquin",
    "surname":"Guzman",
    "age":25,
    "email":"joaquin@guzman.com",
    "password":"123456"
}
```

### POST /api/login
User authentication. Returns a token.

**Request body example**

```
{
    "email":"joaquin@guzman.com",
    "password":"123456"
}
```

### GET /api/getUserInfo
Get user information. Requires a token provided by /api/login endpoint.

**Request headers**

|          Name | Required |  Type   | Value                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `Authorization` | required | string  | Bearer JWT_TOKEN    |                                                                     |
