### ABOUT

This is an endpoint for the fund raising web aplicaition

### Login Api

```
POST http://localhost:6000/api/auth/login<br>

Content-Type: application/json<br>
Authorization: Bearer \${token} <br>
{<br>
"data": {<br>
"username":"cyberxurde",<br>
"password":"password"<br>
}<br>
}<br>
<br>
{<br>
return <br>
status:"success"<br>
state:"loggedIn"<br>
}<br>
```

### Sign up Api

POST http://localhost:6000/api/auth/signup<br>
Content-Type: application/json<br>

{<br>
"data": {<br>
"username":"cyberxurde",<br>
"email":"owoeye1321@gmail.com",<br>
"password":"password"<br>
}<br>
}<br>
return <br>
{<br>
status:"success"<br>
}<br>

### Uploading Gadgets details

http://localhost:6000/api/newUpload/upload<br>
Content-Type: application/json<br>

{<br>
"data":{<br>
"name":"gadget name",<br>
"address":"address",<br>
"details":"details",<br>
"image":{<br>
"data": Buffer,<br>
"contentType":"image/png"<br>
},<br>
"email":"email from req.user details stored from access token"<br>
}<br>
}<br>

### Getting a personal uploads

GET http://localhost:6000/api/read/personal<br>
