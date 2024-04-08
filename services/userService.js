const User = require('../models/UserModel.js');
const axios = require('axios');
const { PLD_URL } = process.env;
const authService = require('./authService.js');
const bcrypt = require('bcrypt');

class UserService {

    checkUserExists(email) {
        return User.findOne({ email: email })
        .then(user => {
            return user!=null;
        })
    }

    async checkUserBlackListed(user) {
        let userBody={
            first_name: user.name,
            last_name: user.surname,
            email: user.email
        }
        let response = await axios.post(PLD_URL, userBody);
        return response.data.is_in_blacklist;
    }

    async register(body){
        const hashedPass=await this.hashPassword(body.password);
        const newUser = new User({
            name: body.name,
            surname: body.surname,
            age: body.age,
            email: body.email,
            password: hashedPass,
        });
        return newUser.save()
        .then(user => {
            return user;
        })
    }

    async hashPassword(password){
        return await bcrypt.hash(password, 10);
    }

    async login(email, password){
        const user= await User.findOne({ email: email })
        if (user!=null && await bcrypt.compare(password, user.password)) {
            return await authService.generateToken(user._id);
        } else {
            return null;
        }
    }

    async getUserInfo(userId){
        const user= await User.findOne({ _id: userId});
        const filteredUser={
            name: user.name,
            surname: user.surname,
            age: user.age,
            email: user.email
        }
        return filteredUser;
    }

}
module.exports = new UserService();