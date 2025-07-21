const router = require('express').Router();
const {
  createCourse,
  enrollStudent,
  getAllCourses,
  getCourseById
} = require('../controllers/course.controller');


router.post('/', createCourse);
router.post('/enroll',enrollStudent);
router.get('/', getAllCourses);
router.get('/:id',getCourseById)

module.exports = router;