const express = require('express');
const userController = require('../controllers/users');
const userAuth = require('../auth/auth');
const userRoute = express.Router();

userRoute.post('/signup', userController.signup);

userRoute.post('/login', userController.login);

userRoute.get('/alluser', userAuth, userController.allUser);

module.exports = userRoute;