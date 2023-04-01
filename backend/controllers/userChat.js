const userChatService = require('../services/userChat');
const user = require('../services/users');

exports.sendMessage = async (req, res, next)=>{
    try{
        const msg = req.body.msg;
        const userId = req.user.id;
        const adduserChat = await userChatService.addChat({msg, userId});
        res.status(200).json();
    }catch(error){
        console.log(error);
    }
}

exports.getMessages = async (req, res, next)=>{
    try{
        const userId = req.user.id;
        const anotherUser = req.header('UserId');
        const chats = await userChatService.findAllChat(userId, anotherUser);
        res.status(200).json({ chats: chats, userId:userId });
    }catch(error){
        console.log(error);
    }
}
