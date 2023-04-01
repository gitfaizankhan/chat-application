const userChat = require('../models/userChat');
const { Op } = require('sequelize');

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

function findAllChat(userId, anotherUser){
    console.log(userId);
    try{
        return new Promise((resolve)=>{
            const chats = userChat.findAll({ where: {
                [Op.and]:{
                    userId: [userId, anotherUser]
                }
            }});
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