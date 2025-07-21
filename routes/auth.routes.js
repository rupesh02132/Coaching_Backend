const express = require('express');
const router = express.Router();
const {
  register,
  login,
} = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login',authenticate, login);


module.exports = router;