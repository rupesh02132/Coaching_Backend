const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const User = require('../models/User');

// Create a new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { title, description, course, dueDate, maxMarks } = req.body;
    
    // Validate course exists
    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    // Verify teacher owns the course
    if (courseExists.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You can only create assignments for your own courses' });
    }
    
    const assignment = new Assignment({
      title,
      description,
      course,
      teacher: req.user.id,
      dueDate,
      maxMarks
    });
    
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Submit assignment content
exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId, content } = req.body;
    
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    // Verify student is enrolled in course
    const course = await Course.findById(assignment.course);
    if (!course.students.includes(req.user.id)) {
      return res.status(403).json({ error: 'You are not enrolled in this course' });
    }
    
    // Check if already submitted
    const existingSubmissionIndex = assignment.submissions.findIndex(
      sub => sub.student.toString() === req.user.id
    );
    
    if (existingSubmissionIndex !== -1) {
      // Update existing submission
      assignment.submissions[existingSubmissionIndex].content = content;
      assignment.submissions[existingSubmissionIndex].submittedAt = new Date();
      assignment.submissions[existingSubmissionIndex].grade = undefined;
      assignment.submissions[existingSubmissionIndex].feedback = undefined;
    } else {
      // Add new submission
      assignment.submissions.push({
        student: req.user.id,
        content
      });
    }
    
    await assignment.save();
    res.json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Grade assignment submission
exports.gradeSubmission = async (req, res) => {
  try {
    const { assignmentId, studentId, grade, feedback } = req.body;
    
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    // Verify teacher owns the assignment
    if (assignment.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You can only grade your own assignments' });
    }
    
    const submission = assignment.submissions.find(
      sub => sub.student.toString() === studentId
    );
    
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found for this student' });
    }
    
    submission.grade = grade;
    submission.feedback = feedback;
    submission.gradedAt = new Date();
    
    await assignment.save();
    res.json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get assignments for a course
exports.getCourseAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ course: req.params.courseId })
      .populate('teacher', 'name')
      .sort({ dueDate: 1 });
      
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get student's assignments with submission status
exports.getStudentAssignments = async (req, res) => {
  try {
    // Get courses the student is enrolled in
    const courses = await Course.find({ students: req.user.id });
    const courseIds = courses.map(course => course._id);
    
    // Get assignments for those courses
    const assignments = await Assignment.find({ course: { $in: courseIds } })
      .populate('course', 'title')
      .populate('teacher', 'name');
    
    // Add submission status to each assignment
    const assignmentsWithStatus = assignments.map(assignment => {
      const submission = assignment.submissions.find(
        sub => sub.student.toString() === req.user.id
      );
      
      return {
        _id: assignment._id,
        title: assignment.title,
        description: assignment.description,
        course: assignment.course,
        dueDate: assignment.dueDate,
        maxMarks: assignment.maxMarks,
        submitted: !!submission,
        submissionId: submission?._id,
        content: submission?.content,
        grade: submission?.grade,
        feedback: submission?.feedback
      };
    });
    
    res.json(assignmentsWithStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get assignment details with submissions
exports.getAssignmentDetails = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('course', 'title')
      .populate('teacher', 'name')
      .populate('submissions.student', 'name email');
      
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    // Verify requester is teacher or enrolled student
    const course = await Course.findById(assignment.course);
    
    if (
      req.user.id !== assignment.teacher.toString() && 
      !course.students.includes(req.user.id)
    ) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update assignment details
exports.updateAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, maxMarks } = req.body;
    
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    // Verify teacher owns the assignment
    if (assignment.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You can only update your own assignments' });
    }
    
    assignment.title = title || assignment.title;
    assignment.description = description || assignment.description;
    assignment.dueDate = dueDate || assignment.dueDate;
    assignment.maxMarks = maxMarks || assignment.maxMarks;
    
    await assignment.save();
    res.json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};