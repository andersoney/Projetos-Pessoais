
const express = require('express')
const app = express()
const port = 3000
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false
});
let constant={
    sequelize
}
require("./models/default.model")(constant)
const router = require("./router/default")(constant)

app.use(router);
app.set('constant', constant);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})