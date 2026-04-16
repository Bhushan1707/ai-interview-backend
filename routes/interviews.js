const express = require('express');
const router = express.Router();
const { getUserSessions, createSession, submitAnswer } = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

router.get('/my-history', protect, getUserSessions);
router.post('/', protect, createSession);
router.post('/:sessionId/results', protect, submitAnswer);

module.exports = router;
