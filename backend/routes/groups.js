const express = require('express');
const groupController = require('../controllers/groups');

const route = express.Router();


route.post('/addgroup', groupController.addgroup);
route.get('/getgroup', groupController.getgroup);
route.get('/chatUsers', groupController.chatUsers)
module.exports = route;