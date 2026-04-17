const express = require('express');
const router = express.Router();
const { sendInvite, getPendingInvites, acceptInvite, rejectInvite, requestToJoin, getNotifications } = require('../controllers/inviteController');
const { protect } = require('../middleware/authMiddleware');

router.get('/notifications', protect, getNotifications);
router.post('/send', protect, sendInvite);
router.post('/join', protect, requestToJoin);
router.get('/pending', protect, getPendingInvites);
router.post('/:id/accept', protect, acceptInvite);
router.post('/:id/reject', protect, rejectInvite);

module.exports = router;
