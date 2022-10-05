### ABOUT

This is an endpoint for the fund raising web aplicaition

### Login Api

```
    POST /api/auth/login

    Content-Type: application/json
    Authorization: Bearer \${token}
    {
    "data": {
    "username":"cyberxurde",
    "password":"password"
    }
    }

    {
    return
    status:"success"
    state:"loggedIn"
    accessToken:''
    refreshToken:''
    }
```

### Sign up Api

```
        POST /api/auth/signup
        Content-Type: application/json

        {
        "data": {
        "username":"cyberxurde",
        "email":"owoeye1321@gmail.com",
        "password":"password"
        }
        }
        return
        {
        status:"success"
        accessToken:''
        refreshToken:''
        }
```

### Uploading Gadgets details

```
    POST /api/newUpload/upload
    Content-Type: application/json

    {
    "data":{
    "name":"gadget name",
    "address":"address",
    "details":"details",
    "image":{
    "data": Buffer,
    "contentType":"image/png"
    },
    "email":"email from req.user details stored from access token"
    }
    }
```

### Getting a personal uploads

```
GET /api/read/personal
```

### Getting all Uploads

```
GET /api/read/all
```

### Refreshing tokens

```
GET /api/token/refresh
```
