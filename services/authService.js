const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

class AuthService {

    verifyToken(req) {
        return new Promise((resolve, reject) => {
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return reject({ status: 401, message: 'Access denied' });
            }
            const token = authHeader.split(' ')[1];
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                req.userId = decoded.userId;
                resolve();
            } catch (error) {
                reject({ status: 401, message: 'Invalid token' });
            }
        });
    }

    async generateToken(userId){
        try {
            const token = await jwt.sign({ userId: userId }, JWT_SECRET, { expiresIn: '1h' });
            return token;
        } catch (error) {
            console.error('Error generating token:', error);
            throw error;
        }
    }
    
}
module.exports = new AuthService();