const express = require('express');
const router = express.Router();
const { getProfile, updateXP, completeTopic } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getProfile);
router.post('/xp', protect, updateXP);
router.post('/topics/:topicId/complete', protect, completeTopic);

module.exports = router;
