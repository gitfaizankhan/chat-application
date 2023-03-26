const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/users');

userRoute.post('/signup', userController.signup);


module.exports = userRoute;