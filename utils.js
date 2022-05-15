const jwt = require('jsonwebtoken');

const secretSigningKey = 'shhhhhhhhhhhhhhhhh';
const options = {

}

const generateToken = (userId) => {
    return jwt.sign({ userId }, secretSigningKey)
}

module.exports = {
    generateToken
}