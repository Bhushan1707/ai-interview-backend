const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const topicRoutes = require('./topicRoutes');
const groupRoutes = require('./groups');
const interviewRoutes = require('./interviews');
const userRoutes = require('./users');
const inviteRoutes = require('./invites');

router.use('/auth', authRoutes);
router.use('/topics', topicRoutes);
router.use('/groups', groupRoutes);
router.use('/interviews', interviewRoutes);
router.use('/users', userRoutes);
router.use('/invites', inviteRoutes);

module.exports = router;
