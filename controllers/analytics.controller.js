const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');

// Get platform analytics (Admin only)
exports.getAnalytics = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const totalCourses = await Course.countDocuments();
    const totalClasses = await Class.countDocuments();
    
    // Get recent activities
    const recentCourses = await Course.find().sort({ createdAt: -1 }).limit(5);
    
    res.json({
      totalStudents,
      totalTeachers,
      totalCourses,
      totalClasses,
      recentCourses
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};