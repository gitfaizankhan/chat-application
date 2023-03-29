const userChatService = require('../services/userChat');
const user = require('../services/users');
// const A = require('../app')
var http = require('http').Server();
var io = require('socket.io')(http);

exports.sendMessage = async (req, res, next)=>{
    try{
        const msg = req.body.msg;
        const userId = req.user.id;
        const adduserChat = await userChatService.addChat({msg, userId});
        console.log("hello", adduserChat);
        io.emit('message', adduserChat);
        console.log("good")
        res.status(200).json();
    }catch(error){
        console.log(error);
    }
}

exports.getMessages = async (req, res, next)=>{
    try{
        const userId = req.user.id;
        const chats = await userChatService.findAllChat();
        res.status(200).json({ chats: chats, userId:userId });
    }catch(error){
        console.log(error);
    }
}