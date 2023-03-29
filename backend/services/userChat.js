const userChat = require('../models/userChat');

function addChat(data){
    try{
        return new Promise((resolve)=>{
            const savechat = userChat.create(data);
            resolve(savechat);
        })
    }catch(error){
        console.log(error);
    }
}

function findAllChat(){
    try{
        return new Promise((resolve)=>{
            const chats = userChat.findAll();
            resolve(chats);
        });
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    addChat,
    findAllChat
}