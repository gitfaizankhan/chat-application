const userModel = require('../models/users');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.addNewUser = (data)=>{
    return new Promise((resolve, reject)=>{
        const salt = 5;
        bcrypt.hash(data.password, salt, async (error, hash) => {
            if(error){
                reject(error);
            }else{
                const resultData = await userModel.create({
                    name: data.name, 
                    email: data.email, 
                    mobile: data.mobile, 
                    password: hash
                });
                resolve(resultData);
            }
        });
    });
};

