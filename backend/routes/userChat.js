const express = require('express');
const userChatController = require('../controllers/userChat');
const userAuth = require('../auth/auth');

const router = express.Router();

router.post('/message', userAuth, userChatController.sendMessage)

router.get('/message', userAuth,  userChatController.getMessages);


module.exports = router;