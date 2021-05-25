
const express = require('express');
let bodyParser = require('body-parser');
const config = require('./config')
const app = express();
const saltRounds = 10;
app.use(express.json());
const port = config.expressConfig.port;
const router = require("./router/default")
app.set('saltRounds', saltRounds)
app.use(router);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})