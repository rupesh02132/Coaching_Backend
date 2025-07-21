const Class = require('../models/Class');
const Attendance = require('../models/Attendance');
const Assignment = require('../models/Assignment');

// Create a new class
exports.createClass = async (req, res) => {
  try {
    const { className, course, schedule } = req.body;
    const newClass = new Class({
      className,
      course,
      teacher: req.user.id,
      schedule
    });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Record attendance
exports.recordAttendance = async (req, res) => {
  try {
    const { classId, studentId, status } = req.body;
    const attendance = new Attendance({
      class: classId,
      student: studentId,
      status
    });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get teacher's classes
exports.getTeacherClasses = async (req, res) => {
  try {
    const classes = await Class.find({ teacher: req.user.id })
      .populate('course', 'title')
      .populate('students', 'name');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};