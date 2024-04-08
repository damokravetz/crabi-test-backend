const userService = require('../services/userService.js');
const User = require('../models/UserModel.js');
const authService = require('../services/authService.js');

class UserController {

    async create(req, res) {
        try{
            let userExists=await userService.checkUserExists(req.body.email);
        if(userExists==false){
            let userBlackListed= await userService.checkUserBlackListed(req.body);
            if(userBlackListed==false){
                let response=await userService.register(req.body);
                res.status(201).send("User "+response.name+" registered successfully");
            }else{
                res.status(409).send("This user is Blacklisted");
            }
        }else{
            res.status(409).send("There is already a user registered with the same email address");
        }
        }catch(e){
            console.log(e)
            res.status(500).send("There was an error");
        }
    }

    async login(req, res){
        try{
            const token=await userService.login(req.body.email, req.body.password);
            if(token!=null){
                res.status(200).json({token});
            }else{
                res.status(403).send("Login failed, wrong username or password");
            }
        }catch(e){
            res.status(500).send("Error trying to login");
        }
    }

    async getUserInfo(req, res){
        try{
            await authService.verifyToken(req);
            const user = await userService.getUserInfo(req.userId);
            if(user!=null){
                res.status(200).json(user);
            }else{
                res.status(500).send("Error finding user");
            }
        }catch(e){
            res.status(e.status).send(e.message);
        }
    }

}
module.exports = new UserController();