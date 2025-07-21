const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const Class = require('../models/Class');

// Get student's courses
exports.getStudentCourses = async (req, res) => {
  try {
    const courses = await Course.find({ students: req.user.id })
      .populate('teacher', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get assignments for a student
exports.getStudentAssignments = async (req, res) => {
  try {
    const studentCourses = await Course.find({ students: req.user.id });
    const courseIds = studentCourses.map(course => course._id);
    
    const assignments = await Assignment.find({ course: { $in: courseIds } })
      .populate('course', 'title');
    
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit assignment
exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId, submission } = req.body;
    const assignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { $push: { submissions: { student: req.user.id, content: submission } } },
      { new: true }
    );
    res.json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};