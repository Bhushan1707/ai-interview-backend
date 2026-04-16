const { StudyGroup, User, GroupMember } = require('../models');

const getGroups = async (req, res) => {
  try {
    const groups = await StudyGroup.findAll({
      include: [
        { model: User, as: 'owner', attributes: ['id', 'displayName'] },
        { model: User, as: 'members', attributes: ['id', 'displayName', 'xp', 'avatarUrl'] }
      ]
    });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const ownerId = req.user.id; // From authMiddleware

    const newGroup = await StudyGroup.create({ name, ownerId });
    
    await GroupMember.create({
      groupId: newGroup.id,
      userId: ownerId,
      joinedAt: new Date()
    });

    res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const joinGroup = async (req, res) => {
  try {
    const userId = req.user.id;
    const member = await GroupMember.create({
      groupId: req.params.id,
      userId,
      joinedAt: new Date()
    });
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getGroups,
  createGroup,
  joinGroup,
};
