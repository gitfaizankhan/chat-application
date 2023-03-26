const userService = require('../services/users');

exports.signup = async (req, res, next)=>{
    try{
        const userData = req.body;
        const userFind = await userService.finduser(userData.email);
        if (!userFind){
            const user = await userService.addNewUser(userData);
            res.status(200).json({ user: user, success: true });
        }
    }catch(error){
        res.status(409).json({ success: false, msg: 'User already exists' });
    }
}
