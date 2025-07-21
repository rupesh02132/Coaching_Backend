const router = require('express').Router();
const { getAnalytics } = require('../controllers/analytics.controller');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/', getAnalytics);

module.exports = router;