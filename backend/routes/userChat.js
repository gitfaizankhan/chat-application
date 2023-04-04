const express = require('express');
const userChatController = require('../controllers/userChat');
const userAuth = require('../auth/auth');

const router = express.Router();

module.exports = (io) => {
    router.post('/message', userAuth, (req, res) =>
        userChatController.sendMessage(io, req, res)
    );
    router.get('/message', userAuth, userChatController.getMessages);

    return router;
};
