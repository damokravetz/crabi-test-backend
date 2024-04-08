const userController = require('../controllers/userController.js');

module.exports = (router) => {
    router.post('/register', userController.create);
    router.post('/login', userController.login);
    router.get('/getUserInfo', userController.getUserInfo);
};