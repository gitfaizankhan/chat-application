const { json } = require('body-parser');
const Groups = require('../models/groups');
const User = require('../models/users');
const sequelize = require('sequelize');

exports.getgroup = async (req, res, next)=>{
    const result = await GroupModule.findAll({
        include: User
    });
    res.status(200).json({result: result});
}

exports.addgroup = async(req, res, next)=>{
    const name = req.body.name;
    const userId = req.body.userId;
    const admin = req.user.email;
    console.log("userId ", userId)
    const isExistGroup = await Groups.Group.findOne({ where: { name: name } });
    if (!isExistGroup){
        const newGroup = await Groups.Group.create({ name: name, admin: admin });
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
    // console.log("hello faizan", req.user.name);
    console.log(req.user.id);
    const yourGroup = await Groups.User_Group.findAll({where:{userId:req.user.id}});
    const myg = JSON.parse(JSON.stringify(yourGroup));
    console.log(myg);
    const mygroup = [];
    for(f of myg){
        console.log(f['groupId'])
        mygroup.push(f['groupId'])
    }
    const name = await User.findAll({
        attributes: ['id', 'name', 
            [sequelize.literal(`CASE WHEN name = '${req.user.name || 'unknown'}' THEN 'me' ELSE 'user' END`), 'category']
        ]
    }); 
    const group = await Groups.Group.findAll({
        attributes: ['id', 'name',
            [sequelize.literal(`CONCAT('group')`), 'category']
        ], 
        where: {
            id: mygroup
        }
    })
    const allChatUsers = [...name, ...group];
    res.status(200).json(allChatUsers);
}