const userChatService = require('../services/userChat');
const user = require('../services/users');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

exports.sendMessage = async (req, res, next) => {
    try {
        const msg = req.body.msg;
        const userId = req.user.id;
        const user2 = req.body.user2;
        const datasave = req.body;
        datasave['userId'] = userId;

        // emit the new message to all connected clients
        io.emit('message', datasave);

        const adduserChat = await userChatService.addChat(datasave);
        res.status(200).json();
    } catch (error) {
        console.log(error);
    }
};


exports.getMessages = async (req, res, next)=>{
    try{
        const userId = req.user.id;
        const usertypeId = req.header('userid');
        const category = req.header('category');
        console.log("hello ", category, usertypeId, userId);
        const chats = await userChatService.findAllChat(userId, usertypeId, category);
        // console.log(chats);
        res.status(200).json({chats: chats, userId:userId });
    }catch(error){
        console.log(error);
    }
}
