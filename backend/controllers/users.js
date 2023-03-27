const userService = require('../services/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');


exports.signup = async (req, res, next)=>{
    try{
        const userData = req.body;
        const userFind = await userService.finduser(userData.email);
        if (userFind === null){
            const user = await userService.addNewUser(userData);
            res.status(200).json({ user: user, success: true });
        }else{
            res.status(409).json({ success: false, msg: 'User already exists' });
        }
    }catch(error){
        console.log(error);
    }
}

function generateToken(id){
    return jwt.sign({ userId: id }, process.env.TOKEN_SECRET, {expiresIn: '1200s'});
}

exports.login = async(req, res, next)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const userFind = await userService.finduser(email);
        if(userFind){
            if(bcrypt.compareSync(password, userFind.password)){
                res.status(200).json({
                    msg:'User Logged in Successfully',
                    success: true,
                    token: generateToken(userFind.id)
                });
            }else{
                res.status(401).json({
                    message: "User not authorized",
                    success: false
                });
            }
        }else{
            res.status(404).json({
                message: "User Not Found",
                success: false
            });
        }
    }catch(error){
        res.json(error)
        console.log(error);
    }
}
