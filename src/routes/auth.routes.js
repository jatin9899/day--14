const express = require('express');
const userModel = require('../models/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const authRouther = express.Router();

const authController = require('../controllers/auth.controller');


authRouther.post('/register', authController.registerController)

authRouther.post('/login', authController.loginController)

module.exports = authRouther;