const { User, Topic, UserTopic } = require('../models');

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

module.exports = {
  getProfile,
  updateXP,
  completeTopic,
};
