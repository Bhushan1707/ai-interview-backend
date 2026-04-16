const express = require('express');
const router = express.Router();
const { Topic, Question } = require('../models');

// GET all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.findAll();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET questions for a specific topic
router.get('/:id/questions', async (req, res) => {
  try {
    const { difficulty } = req.query;
    const whereClause = { topicId: req.params.id };
    
    if (difficulty && difficulty !== 'all') {
      whereClause.difficulty = difficulty.split(',');
    }

    const questions = await Question.findAll({
      where: whereClause
    });
    
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
