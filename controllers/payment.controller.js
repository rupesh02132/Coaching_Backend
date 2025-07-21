const Payment = require('../models/Payment');
const User = require('../models/User');
const Course = require('../models/Course');

exports.createPayment = async (req, res) => {
  try {
    const { studentId, courseId, amount, paymentMethod } = req.body;
    const payment = new Payment({ 
      student: studentId, 
      course: courseId, 
      amount, 
      paymentMethod 
    });
    
    await payment.save();
    
    // Update student's courses
    await User.findByIdAndUpdate(studentId, { 
      $addToSet: { courses: courseId } 
    });
    
    // Update course's students
    await Course.findByIdAndUpdate(courseId, { 
      $addToSet: { students: studentId } 
    });
    
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStudentPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ student: req.user.id })
      .populate('course', 'title');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};