const express = require('express');
const { register, login, forgotPassword,changepasswordLink,setNewPassword } = require('../controllers/authController');
const router = express.Router();
const { registerSchema, loginSchema } = require('../validations/authValidation');
const validationMiddleware = require('../middleware/validationMiddleware');


//user-register api
router.post('/register', validationMiddleware(registerSchema), register);

//user-login api
router.post('/login', validationMiddleware(loginSchema), login);

//forgot-password api
router.post('/forgot-password', forgotPassword);

router.get('/reset-password/:token', changepasswordLink);

//set new password
router.post('/new-password/:token', setNewPassword);

module.exports = router;
