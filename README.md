# crabi-test-backend

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
