const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
  });

  return `bearer ${token}`;
};
