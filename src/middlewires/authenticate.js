const jwt = require('../utils/jwt.js');

const authenticate = async (req, res, next) => {
    // Extract the token from the 'Authorization' header
    const token = req.headers['authorization']?.split(' ')[1];
    // If no token is provided, return a 401 Unauthorized response
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
    }
    try {
        const payload = await jwt.verifyToken(token);
        req.userId = payload.id;
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports = authenticate;