const userService = require('../services/users');

exports.signup = async (req, res, next)=>{
    try{
        const userData = req.body;
        const user = await userService.addNewUser(userData);
        res.status(200).json({ user: user, success: true });
    }catch(error){
        res.status(400).json({Error: `${error}`, success: false});
    }
}
