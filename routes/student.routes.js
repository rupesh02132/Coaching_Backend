const router = require('express').Router();
const {
  getStudentCourses,
  getStudentAssignments,
  submitAssignment
} = require('../controllers/student.controller');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/courses',  getStudentCourses);
router.get('/assignments', getStudentAssignments);
router.post('/assignments/submit',  submitAssignment);

module.exports = router;