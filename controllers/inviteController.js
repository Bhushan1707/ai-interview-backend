const { GroupInvite, StudyGroup, GroupMember, User, Sequelize } = require('../models');
const { Op } = Sequelize;

// Send an invite
exports.sendInvite = async (req, res) => {
  try {
    const { groupId, receiverId } = req.body;
    const senderId = req.user.id;

    if (!groupId || !receiverId) {
      return res.status(400).json({ error: 'groupId and receiverId are required' });
    }

    // Check if invite already exists
    const existingInvite = await GroupInvite.findOne({
      where: { groupId, receiverId, status: 'pending' }
    });

    if (existingInvite) {
      return res.status(400).json({ error: 'Invite already sent' });
    }

    // Check if user is already a member
    const existingMember = await GroupMember.findOne({
      where: { groupId, userId: receiverId }
    });

    if (existingMember) {
      return res.status(400).json({ error: 'User is already a member of this group' });
    }

    const invite = await GroupInvite.create({
      groupId,
      senderId,
      receiverId,
      status: 'pending',
      type: 'invite'
    });

    res.status(201).json(invite);
  } catch (error) {
    console.error('Error sending invite:', error);
    res.status(500).json({ error: 'Server error while sending invite' });
  }
};

// Get pending invites for the current user
exports.getPendingInvites = async (req, res) => {
  try {
    const invites = await GroupInvite.findAll({
      where: { receiverId: req.user.id, status: 'pending' },
      include: [
        { model: StudyGroup, as: 'group', attributes: ['id', 'name'] },
        { model: User, as: 'sender', attributes: ['id', 'displayName', 'avatarUrl'] }
      ]
    });
    res.json(invites);
  } catch (error) {
    console.error('Error fetching pending invites:', error);
    res.status(500).json({ error: 'Server error fetching invites' });
  }
};

// Accept an invite
exports.acceptInvite = async (req, res) => {
  try {
    const { id } = req.params;
    const invite = await GroupInvite.findOne({
      where: { id, receiverId: req.user.id, status: 'pending' }
    });

    if (!invite) {
      return res.status(404).json({ error: 'Invite not found or already processed' });
    }

    // Mark accepted
    invite.status = 'accepted';
    await invite.save();

    // Create group member
    // If it was an invite, req.user.id is the receiver who is adding themselves.
    // If it was a request, req.user.id is the owner who is adding the sender.
    const newMemberId = invite.type === 'request' ? invite.senderId : invite.receiverId;

    await GroupMember.create({
      groupId: invite.groupId,
      userId: newMemberId,
      joinedAt: new Date()
    });

    res.json({ message: 'Invite accepted' });
  } catch (error) {
    console.error('Error accepting invite:', error);
    res.status(500).json({ error: 'Server error processing invite' });
  }
};

// Reject an invite
exports.rejectInvite = async (req, res) => {
  try {
    const { id } = req.params;
    const invite = await GroupInvite.findOne({
      where: { id, receiverId: req.user.id, status: 'pending' }
    });

    if (!invite) {
      return res.status(404).json({ error: 'Invite not found or already processed' });
    }

    // Mark rejected
    invite.status = 'rejected';
    await invite.save();

    res.json({ message: 'Invite rejected' });
  } catch (error) {
    console.error('Error rejecting invite:', error);
    res.status(500).json({ error: 'Server error processing invite' });
  }
};

// Send a join request (User -> Group Owner)
exports.requestToJoin = async (req, res) => {
  try {
    const { groupId } = req.body;
    const senderId = req.user.id;

    const group = await StudyGroup.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const receiverId = group.ownerId;

    // Prevent owner requesting to join their own group
    if (senderId === receiverId) {
      return res.status(400).json({ error: 'You are the owner of this group' });
    }

    // Check if request/invite already exists
    const existingInvite = await GroupInvite.findOne({
      where: { groupId, [Op.or]: [{ senderId }, { receiverId: senderId }], status: 'pending' }
    });

    if (existingInvite) {
      return res.status(400).json({ error: 'Pending request or invite already exists' });
    }

    // Check if user is already a member
    const existingMember = await GroupMember.findOne({
      where: { groupId, userId: senderId }
    });

    if (existingMember) {
      return res.status(400).json({ error: 'You are already a member of this group' });
    }

    const invite = await GroupInvite.create({
      groupId,
      senderId,
      receiverId,
      status: 'pending',
      type: 'request'
    });

    res.status(201).json(invite);
  } catch (error) {
    console.error('Error sending join request:', error);
    res.status(500).json({ error: 'Server error while sending request' });
  }
};

// Get all notifications (both invites and join requests)
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await GroupInvite.findAll({
      where: { receiverId: req.user.id, status: 'pending' },
      include: [
        { model: StudyGroup, as: 'group', attributes: ['id', 'name'] },
        { model: User, as: 'sender', attributes: ['id', 'displayName', 'avatarUrl'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Server error fetching notifications' });
  }
};

