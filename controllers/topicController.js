const { Topic, Question, UserQuestion } = require('../models');

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
    const { difficulty, markedOnly } = req.query;
    const whereClause = { topicId: req.params.id };
    
    if (difficulty && difficulty !== 'all') {
      whereClause.difficulty = difficulty.split(',');
    }

    const include = [];
    if (markedOnly === 'true') {
       include.push({
         model: Question.associations.completedBy.target, // Get User model
         as: 'completedBy',
         where: { id: req.user.id },
         required: true
       });
    }

    const questions = await Question.findAll({
      where: whereClause,
      include
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
