const express = require('express');
const router = express.Router();
const { sendInvite, getPendingInvites, acceptInvite, rejectInvite } = require('../controllers/inviteController');
const { protect } = require('../middleware/authMiddleware');

router.post('/send', protect, sendInvite);
router.get('/pending', protect, getPendingInvites);
router.post('/:id/accept', protect, acceptInvite);
router.post('/:id/reject', protect, rejectInvite);

module.exports = router;
