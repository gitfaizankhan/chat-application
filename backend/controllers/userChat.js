const userChatService = require('../services/userChat');


exports.sendMessage = async (io, req, res, next) => {
    try {
        const userId = req.user.id;
        const datasave = req.body;
        datasave['userId'] = userId;
        
        const saveData = await userChatService.addChat(datasave);
        io.emit('new_message', { chats: saveData});
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
        const chats = await userChatService.findAllChat(userId, usertypeId, category);
        res.status(200).json({chats: chats});
    }catch(error){
        console.log(error);
    }
}
