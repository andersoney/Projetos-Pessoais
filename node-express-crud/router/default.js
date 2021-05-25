const { DataTypes, Model } = require('sequelize');
module.exports = (constant) => {
    var express = require('express');
    var router = express.Router();
    let moment = require('moment')
    let User = (Model)(constant.sequelize.models.User);
    console.log(typeof (User));
    moment.locale('PT-BR')
    // middleware that is specific to this router
    router.use(function timeLog(req, res, next) {
        console.log('Time: ', moment().format('LLL'));

        next();
    });
    // define the home page route
    router.get('/', function (req, res) {
        res.send('Home Page');
    });
    // define the about route
    router.get('/about', function (req, res) {
        res.send('About birds');
    });

    return router;
}