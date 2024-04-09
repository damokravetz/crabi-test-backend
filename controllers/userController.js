const userService = require('../services/userService.js');
const User = require('../models/UserModel.js');
const authService = require('../services/authService.js');
const Joi = require('@hapi/joi');

class UserController {

    async create(req, res) {
        const userSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            surname: Joi.string().min(3).max(30).required(),
            age: Joi.number().integer().min(18).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(30).required()
        });
        const { error, value: userData } = await userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        try{
            let userExists=await userService.checkUserExists(userData.email);
        if(userExists==false){
            let userBlackListed= await userService.checkUserBlackListed(userData);
            if(userBlackListed==false){
                let response=await userService.register(userData);
                res.status(201).send({message:"User "+response.name+" registered successfully"});
            }else{
                res.status(409).send({error:"This user is Blacklisted"});
            }
        }else{
            res.status(409).send({error:"There is already a user registered with the same email address"});
        }
        }catch(e){
            console.log(e)
            res.status(500).send({error:"There was an error"});
        }
    }

    async login(req, res){
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(30).required()
        });
        const { error, value: userData } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        try{
            const token=await userService.login(userData.email, userData.password);
            if(token!=null){
                res.status(200).json({token});
            }else{
                res.status(403).send({error:"Login failed, wrong username or password"});
            }
        }catch(e){
            res.status(500).send({error:"Error trying to login"});
        }
    }

    async getUserInfo(req, res){
        try{
            await authService.verifyToken(req);
            const user = await userService.getUserInfo(req.userId);
            if(user!=null){
                res.status(200).json(user);
            }else{
                res.status(500).send({error:"Error finding user"});
            }
        }catch(e){
            res.status(e.status).send({error:e.message});
        }
    }

}
module.exports = new UserController();