const router = require('express').Router();
const { 
  createPayment, 
  getStudentPayments 
} = require('../controllers/payment.controller');
const auth = require('../middleware/auth');

router.post('/',createPayment);
router.get('/student',  getStudentPayments);

module.exports = router;