const Groups = require('../models/groups');
const User = require('../models/users');

exports.getgroup = async (req, res, next)=>{
    const result = await GroupModule.findAll({
        include: User
    });
    res.status(200).json({result: result});
}

exports.addgroup = async(req, res, next)=>{
    const name = req.body.name;
    const userId = req.body.userId;
    const isExistGroup = await Groups.Group.findOne({ where: { name: name } });
    if(!isExist){
        const newGroup = await Groups.Group.create({ name: name });
        for(let id of userId){
            await Groups.User_Group.bulkCreate([{ groupId: newGroup.id, userId: id, }]);
        }
    }else{
        for (let id of userId) {
            await Groups.User_Group.bulkCreate([{ groupId: isExistGroup.id, userId: id, }]);
        }
    }
    res.status(200).json({ success: true });
}


exports.chatUsers = async (req, res, next) => {
    console.log("hello");
    const name = await User.findAll({
        attributes: ['id', 'name']
    }); 
    const group = await Groups.Group.findAll({
        attributes: ['id', 'name']
    })
    const allChatUsers = [...name, ...group];
    res.status(200).json(allChatUsers);
}