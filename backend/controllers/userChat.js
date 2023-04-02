const userChatService = require('../services/userChat');
const user = require('../services/users');

exports.sendMessage = async (req, res, next) => {
    try {
        const msg = req.body.msg;
        const userId = req.user.id;
        const user2 = req.body.user2;
        const datasave = req.body;
        datasave['userId'] = userId;
        await userChatService.addChat(datasave);
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
