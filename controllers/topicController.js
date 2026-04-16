const { Topic, Question } = require('../models');

const getTopics = async (req, res) => {
  try {
    const topics = await Topic.findAll();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTopicQuestions = async (req, res) => {
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
};

module.exports = {
  getTopics,
  getTopicQuestions,
};
