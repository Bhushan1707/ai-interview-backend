const { User, Topic, UserTopic, UserQuestion, Sequelize } = require('../models');
const { Op } = Sequelize;

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'displayName', 'contact', 'xp', 'avatarUrl'],
      include: [
        { model: Topic, as: 'completedTopics', through: { attributes: ['completedAt'] } }
      ]
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateXP = async (req, res) => {
  try {
    const { xpToAdd } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    user.xp = (user.xp || 0) + xpToAdd;
    await user.save();
    
    res.json({ success: true, newXp: user.xp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const completeTopic = async (req, res) => {
  try {
    const [userTopic, created] = await UserTopic.findOrCreate({
      where: {
        userId: req.user.id,
        topicId: req.params.topicId
      },
      defaults: {
        completedAt: new Date()
      }
    });

    if (!created) {
      userTopic.completedAt = new Date();
      await userTopic.save();
    }

    res.json({ success: true, message: 'Topic marked as completed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);
    
    const users = await User.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { displayName: { [Op.like]: `%${q}%` } },
              { email: { [Op.like]: `%${q}%` } }
            ]
          },
          { id: { [Op.ne]: req.user.id } }
        ]
      },
      attributes: ['id', 'displayName', 'email', 'xp', 'avatarUrl'],
      limit: 10
    });
    
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const toggleQuestionCompletion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const userId = req.user.id;

    const existing = await UserQuestion.findOne({
      where: { userId, questionId }
    });

    if (existing) {
      await existing.destroy();
      res.json({ success: true, completed: false });
    } else {
      await UserQuestion.create({ userId, questionId });
      res.json({ success: true, completed: true });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCompletedQuestions = async (req, res) => {
  try {
    const userId = req.user.id;
    const completed = await UserQuestion.findAll({
      where: { userId },
      attributes: ['questionId']
    });
    res.json(completed.map(c => c.questionId.toString()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProfile,
  updateXP,
  completeTopic,
  searchUsers,
  toggleQuestionCompletion,
  getCompletedQuestions,
};
