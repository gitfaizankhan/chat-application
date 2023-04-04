const userChatService = require('../services/userChat');
const user = require('../services/users');
// const server = require('../app');
// const socketIo = require('socket.io');

// const io = socketIo(server);
exports.sendMessage = async (io, req, res, next) => {
    try {
        const msg = req.body.msg;
        const userId = req.user.id;
        const user2 = req.body.user2;
        const datasave = req.body;
        datasave['userId'] = userId;
        
        const saveData = await userChatService.addChat(datasave);
        io.emit('new_message', saveData);
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
        res.status(200).json({chats: chats, userId:userId });
    }catch(error){
        console.log(error);
    }
}
