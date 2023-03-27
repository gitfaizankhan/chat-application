const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/users');

userRoute.post('/signup', userController.signup);

userRoute.post('/login', userController.login);


module.exports = userRoute;