const router = require('express').Router();
const {
  createClass,
  recordAttendance,
  getTeacherClasses
} = require('../controllers/teacher.controller');
const auth = require('../middleware/auth');
const role = require('../middleware/auth');

// router.post('/classes', auth, role(['admin', 'teacher']), createClass);
// router.post('/attendance', auth, role(['admin', 'teacher']), recordAttendance);
// router.get('/classes', auth, role(['admin', 'teacher']), getTeacherClasses);

router.post('/classes',  createClass);
router.post('/attendance',  recordAttendance);
router.get('/classes',  getTeacherClasses);

module.exports = router;