var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const userRoute = require('./users.route')
router.use('/users', userRoute);
const config = require('../config')

let publicRoute = ['/login', '/about']

router.use(function (req, res, next) {
    console.log(123);
    let moment = require('moment');
    moment.locale('PT-BR')
    console.log('Time: ', moment().format('LLL'));
    console.log(publicRoute.indexOf(req.originalUrl));
    // console.log();
    next();
});
// define the home page route
router.post('/login', async (req, res) => {
    const UserModel = require('../models/userModel');
    const bcrypt = require('bcrypt');
    let data = { userName: req.body.userName.toLowerCase() };
    let user = await UserModel.findOne({ where: data });
    if (user && await user.validPassword(req.body.password)) {
        user.timeExpiration();
        res.send({ sucess: true, data: user, token: jwt.sign(user.toJSON(), config.jwtConfig.privateKey) });
    } else {
        res.status(401).send({ sucess: false, msg: "Usuario não autorizado", type: 'Unauthorized ' });
    }
});
// define the about route
router.get('/about', function (req, res) {
    res.send('About birds');
});

module.exports = router;