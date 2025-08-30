// routes/userRoutes.js

const express = require('express');
const { register, login } = require('../controllers/userController');

const router = express.Router();

// Register route (allows setting role)
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;
