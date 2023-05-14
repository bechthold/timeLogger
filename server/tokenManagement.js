const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (userId) => {
    const secretKey = process.env.SECRET_KEY;
    return jwt.sign({userId}, secretKey);
  },

  calculateExpirationTime: (issuedAt) => {
    const expirationTime = new Date(issuedAt);
    expirationTime.setHours(expirationTime.getHours() + 1);
    return expirationTime;
  }
};

