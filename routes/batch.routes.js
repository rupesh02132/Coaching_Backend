const router = require('express').Router();
const { 
  createBatch, 
  addStudentToBatch, 
  getBatchStudents 
} = require('../controllers/batch.controller');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/',createBatch);
router.post('/add-student',  addStudentToBatch);
router.get('/:batchId/students',  getBatchStudents);

module.exports = router;