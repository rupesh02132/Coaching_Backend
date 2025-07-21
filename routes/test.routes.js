const router = require('express').Router();
const { 
  createTest, 
  addTestResult, 
  getCourseTests 
} = require('../controllers/test.controller');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', createTest);
router.post('/result', addTestResult);
router.get('/course/:courseId', getCourseTests);

module.exports = router;