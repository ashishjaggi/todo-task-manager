const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { generateToken } = require('../utills/generateToken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Op } = require('sequelize');
require('dotenv').config();



// Register User
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User register successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error: error.message });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error: error.message });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(404).json({ message: 'User with this email does not exist' });
      }


      // Create password reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      const resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

      // Update user with reset token and expiration
      await User.update({
          resetPasswordToken,
          resetPasswordExpires,
      }, { where: { email } });

      // Send email with reset link
      const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
      const message = `You are receiving this because you requested a password reset.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;
      
      try{
      // Nodemailer setup
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
          }
      });

     let info = await transporter.sendMail({
          from: process.env.EMAIL_USERNAME, 
          to: email,
          subject: 'Password Reset',
          text: message
      });

      console.log('Email sent:', info.response);

    }catch(error){
      console.log(error)
      res.status(500).json({ message: 'Error sending email' });
    }

    res.status(200).json({ message: 'Email sent with password reset instructions' });
  } catch (err) {
      res.status(500).json({ message: 'Error sending email' });
  }
};


const changepasswordLink =  async (req, res) => {
  const { token } = req.params;

  // Hash the token to compare with stored hashed token
  const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

  try {
      // Find user by token and check expiration
      const user = await User.findOne({
          where: {
              resetPasswordToken,
              resetPasswordExpires: { [Op.gt]: Date.now() }
          }
      });

      if (!user) {
          return res.status(400).json({ message: 'Token is invalid or has expired' });
      }

      // Render reset password form (EJS file)
      res.render('resetPassword', { token });
  } catch (err) {
      res.status(500).json({ message: 'Server error' });
  }
};



const setNewPassword =  async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    try {
        // Find the user by token
        const user = await User.findOne({
            where: {
                resetPasswordToken,
                resetPasswordExpires: { [Op.gt]: Date.now() }
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Token is invalid or has expired' });
        }

        // Hash new password and update user record
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error resetting password' });
    }
};

module.exports = {
  register,
  forgotPassword,
  login,
  changepasswordLink,
  setNewPassword
};