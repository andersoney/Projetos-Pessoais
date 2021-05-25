var express = require('express');
var router = express.Router();

const UserModel = require('../models/userModel');

// define the home page route
router.get('/', async function (req, res) {
    user = await UserModel.findAll();
    res.send(user);
});
router.post('/', async function (req, res) {
    try {
        let data = req.body;
        data.userName = data.userName.toLowerCase();
        data.email = data.email.toLowerCase();
        let user = await UserModel.create(data)
        await user.generateHash();
        res.send({ sucess: true, data: user });
    } catch (errCreate) {
        console.log(errCreate);
        res.status(200).send({ sucess: false, msg: "Falha na criação do usuario.", type: errCreate.errors });
    }
});


module.exports = router;