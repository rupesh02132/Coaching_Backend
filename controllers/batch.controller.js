const Batch = require('../models/Batch');

exports.createBatch = async (req, res) => {
  try {
    const { name, course, startDate, endDate } = req.body;
    const batch = new Batch({ name, course, startDate, endDate });
    await batch.save();
    res.status(201).json(batch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addStudentToBatch = async (req, res) => {
  try {
    const { batchId, studentId } = req.body;
    const batch = await Batch.findByIdAndUpdate(
      batchId,
      { $addToSet: { students: studentId } },
      { new: true }
    );
    res.json(batch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBatchStudents = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.batchId)
      .populate('students', 'name email');
    res.json(batch.students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};