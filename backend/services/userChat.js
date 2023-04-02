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

function findAllChat(userId, usertypeId, category){
    console.log("userId ", userId, "usertypeId", usertypeId, "category", category);
    try{
        return new Promise((resolve)=>{
            let chats;
            if(category === 'user'){
                chats = userChat.findAll({
                    where: {
                        [Op.or]: [
                            { userId: userId, user2: usertypeId },
                            { userId: usertypeId, user2: userId }
                        ]
                    }
                });
            }
            if(category === 'group'){
                chats = userChat.findAll({
                    where: {
                        [Op.or]: [
                            { userId: userId, groupId: usertypeId },
                            { userId: usertypeId, groupId: userId }
                        ]
                    }
                });
            }
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