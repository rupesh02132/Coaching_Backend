const express = require('express');
const router = express.Router();


const {authenticate} = require('../middleware/authMiddleware');
const {
  getUserProfile,
  getAllUser,
  updateUserProfile,
  deleteUserController,
  updateUserRole
} = require('../controllers/user.controller');



// Protected routes
router.get('/profile', authenticate, getUserProfile);
router.get('/users', authenticate, getAllUser);
router.put('/updateProfile', authenticate, updateUserProfile);
router.delete('/:userId', authenticate, deleteUserController);
router.put('/updateRole', authenticate, updateUserRole);    


module.exports = router;
