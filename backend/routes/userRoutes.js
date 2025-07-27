const express = require('express');
const User = require('../modals/user');
const router = express.Router();
const { authenticateToken } = require('../security/jwt');

// importing the user controller functions.
const { registerUser, loginUser, getUserProfile, getAllByRole } = require('../controllers/userController');

// Auth route.
router.post('/register',registerUser);
router.post('/login',loginUser);

router.get('/profile', authenticateToken, getUserProfile);
router.get('/fetch', authenticateToken, getAllByRole);
module.exports = router;