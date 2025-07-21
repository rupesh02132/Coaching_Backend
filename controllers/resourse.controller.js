const Resource = require('../models/Resource');

uploadResource = async (req, res) => {
  try {
    const { title, description, fileUrl, course } = req.body;
    const resource = new Resource({
      title,
      description,
      fileUrl,
      course,
      uploadedBy: req.user.id
    });
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

getCourseResources = async (req, res) => {
  try {
    const resources = await Resource.find({ course: req.params.courseId })
      .populate('uploadedBy', 'name');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadResource,
  getCourseResources
};