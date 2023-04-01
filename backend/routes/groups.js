const express = require('express');
const groupController = require('../controllers/groups');
const userAuth = require('../auth/auth');


const route = express.Router();


route.post('/addgroup', userAuth,  groupController.addgroup);

route.get('/getgroup', userAuth, groupController.getgroup);

route.get('/chatUsers', userAuth, groupController.chatUsers);

module.exports = route;