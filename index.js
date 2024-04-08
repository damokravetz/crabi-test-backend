const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require('./db');
const router = express.Router();
const app = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/user.routes.js')(router);

app.use('/api', router);

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});