const express = require('express');
const router = express.Router();
const { getProfile, updateXP, completeTopic, searchUsers, toggleQuestionCompletion, getCompletedQuestions } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getProfile);
router.get('/search', protect, searchUsers);
router.post('/xp', protect, updateXP);
router.post('/topics/:topicId/complete', protect, completeTopic);
router.get('/questions', protect, getCompletedQuestions);
router.post('/questions/:questionId/toggle', protect, toggleQuestionCompletion);

module.exports = router;
