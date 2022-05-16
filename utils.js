const jwt = require('jsonwebtoken');

const secretSigningKey = process.env.SECRET_KEY || 'shhhhhhhhhhhhhhhhh';

const generateToken = (userId) => {
    return jwt.sign({ userId }, secretSigningKey)
}

const verifyToken = (token) => {
    return jwt.verify(token, secretSigningKey)
}


module.exports = {
    generateToken,
    verifyToken,
}