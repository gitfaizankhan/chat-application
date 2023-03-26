const userModel = require('../models/users');
const bcrypt = require('bcrypt');
require('dotenv').config();

function addNewUser(data){
    return new Promise((resolve, reject)=>{
        const salt = 5;
        bcrypt.hash(data.password, salt, async (error, hash) => {
            try{
                const resultData = await userModel.create({
                    name: data.name,
                    email: data.email,
                    mobile: data.mobile,
                    password: hash
                });
                resolve(resultData);
            }catch(error){
                reject(error);
            }
        });
    });
};

function finduser(userId){
    return new Promise(async (reject, resolve)=>{
        const user = await userModel.findOne({ where: { email: userId } });
        if(user){
            resolve(user);
        }else{
            reject(user);
        }
    })
}


module.exports = {
    addNewUser, 
    finduser
}
