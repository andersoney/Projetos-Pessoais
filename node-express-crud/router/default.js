var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const userRoute = require('./users.route')

const config = require('../config')

let publicRoute = ['/login', '/about']
router.use((req, res, next) => {
    console.log(123);
    let moment = require('moment');
    moment.locale('PT-BR')
    console.log('Time: ', moment().format('LLL'));
    console.log();
    if (publicRoute.indexOf(req.originalUrl) != -1) {
        next();
    } else {
        if (req.headers.token) {
            let user = jwt.verify(req.headers.token, config.jwtConfig.privateKey);
            if (moment().isBefore(moment(user.timeExpiration))) {
                next();
            } else {
                res.status(401).send({ sucess: false, msg: "Token Expirado", type: 'Expired_token ', data: jwt.verify(req.headers.token, config.jwtConfig.privateKey), callback: '/login' });
            }
        } else {
            res.status(401).send({ sucess: false, msg: "Usuario não autorizado", type: 'Unauthorized ', callback: '/login' });
        }
    }
    // console.log();

});

// define the home page route
router.post('/login', async (req, res) => {
    const UserModel = require('../models/userModel');
    const bcrypt = require('bcrypt');
    let data = { userName: req.body.userName.toLowerCase() };
    let user = await UserModel.findOne({ where: data });
    if (user && await user.validPassword(req.body.password)) {
        let data = user.toJSON();
        data.timeExpiration = user.timeExpiration();
        res.send({ sucess: true, data: user, token: jwt.sign(data, config.jwtConfig.privateKey) });
    } else {
        res.status(401).send({ sucess: false, msg: "Usuario não autorizado", type: 'Unauthorized ' });
    }
});
// define the about route
router.get('/about', function (req, res) {
    res.send('About birds');
});

router.use('/users', userRoute);

module.exports = router;