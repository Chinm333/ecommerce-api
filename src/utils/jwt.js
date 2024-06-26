const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateToken = (id) => {
    return jwt.sign({ id },
        process.env.JWT_SECURITY_KEY,
        {
            expiresIn: '1h',
        }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECURITY_KEY);
};

module.exports = { 
    generateToken, 
    verifyToken
}