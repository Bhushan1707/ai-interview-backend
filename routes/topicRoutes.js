const express = require('express');
const router = express.Router();
const { getTopics, getTopicQuestions } = require('../controllers/topicController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getTopics);
router.get('/:id/questions', getTopicQuestions);

module.exports = router;
