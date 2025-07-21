const Course = require('../models/Course');
const User = require('../models/User');

// Create a course (Admin only)
exports.createCourse = async (req, res) => {
  try {
    const {
      id,
      code,
      title,
      description,
      instructor,
      duration,
      level,
      category,
      rating,
      enrolled,
      thumbnail,
      teacher,
      schedule
    } = req.body;
    const course = new Course({
      id,
      code,
      title,
      description,
      instructor,
      duration,
      level,
      category,
      rating,
      enrolled,
      thumbnail,
      teacher,
      schedule
    });
    await course.save();

    // Add course to teacher's courses
    await User.findByIdAndUpdate(teacher, { $push: { courses: course._id } });

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Enroll student in course
exports.enrollStudent = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { students: studentId } },
      { new: true }
    );
    
    // Add course to student's courses
    await User.findByIdAndUpdate(studentId, { $addToSet: { courses: courseId } });
    
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('teacher', 'firstname')
      .populate('students', 'firstname');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacher', 'firstname')
      .populate('students', 'firstname');

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}