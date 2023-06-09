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
    const adminId = req.body.admin;
    const isExistGroup = await Groups.Group.findOne({ where: { name: name } });
    if (!isExistGroup){
        const newGroup = await Groups.Group.create({ name: name });
        for(let id of userId){
            await Groups.User_Group.bulkCreate([{ groupId: newGroup.id, userId: id }]);
        }
        for (let admin of adminId){
            await Groups.GroupAdmin.bulkCreate([{ groupId: newGroup.id, userId: admin }])
        }
    }else{
        for (let id of userId) {
            await Groups.User_Group.bulkCreate([{ groupId: isExistGroup.id, userId: id, }]);
        }
    }

    
    res.status(200).json({ success: true });
}


exports.chatUsers = async (req, res, next) => {
    const myGroupsID = await Groups.User_Group.findAll(
        { where:
            { 
                userId: req.user.id 
            }
        }
    );
    const mgID = JSON.parse(JSON.stringify(myGroupsID));
    const mygroup = [];
    for (id of mgID){
        mygroup.push(id['groupId'])
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