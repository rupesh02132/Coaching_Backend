const express = require('express');
const router = express.Router();
const {
  createAssignment,
  submitAssignment,
  gradeSubmission,
  getCourseAssignments,
  getStudentAssignments,
  getAssignmentDetails,
  updateAssignment
} = require('../controllers/assignment.controller');
const { protect, role } = require('../middleware/auth');

// Teacher routes
router.post('/',createAssignment);
router.put('/:id',updateAssignment);
router.post('/grade',gradeSubmission);

// Student routes
router.post('/submit',submitAssignment);
router.get('/student', getStudentAssignments);

// Shared routes
router.get('/course/:courseId', getCourseAssignments);
router.get('/:id', getAssignmentDetails);

module.exports = router;