const router = require('express').Router();

const { 
  uploadResource, 
  getCourseResources 
} = require('../controllers/resourse.controller');

router.post('/',uploadResource);
router.get('/course/:courseId',getCourseResources);

module.exports = router;