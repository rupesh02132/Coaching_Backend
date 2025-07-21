const Test = require('../models/Test');

exports.createTest = async (req, res) => {
  try {
    const { title, course, maxMarks, date } = req.body;
    const test = new Test({ title, course, maxMarks, date });
    await test.save();
    res.status(201).json(test);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addTestResult = async (req, res) => {
  try {
    const { testId, studentId, marksObtained } = req.body;
    const test = await Test.findByIdAndUpdate(
      testId,
      { $push: { results: { student: studentId, marksObtained } } },
      { new: true }
    );
    res.json(test);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCourseTests = async (req, res) => {
  try {
    const tests = await Test.find({ course: req.params.courseId });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};