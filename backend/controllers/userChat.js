const userChatService = require('../services/userChat');
const chat = require('../models/userChat');

exports.sendMessage = async (req, res, next)=>{
    try{
        const msg = req.body.msg;
        const userId = req.user.id;
        const adduserChat = await userChatService.addChat({msg, userId});
        res.status(200).json({ addChat: adduserChat });
    }catch(error){
        console.log(error);
    }
}