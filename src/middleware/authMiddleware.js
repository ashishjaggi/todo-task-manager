const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.verfiyUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized, invalid token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    console.log(req.user)
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};
