const express = require('express');
const router = express.Router();
const { getGroups, createGroup, joinGroup } = require('../controllers/groupController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getGroups);
router.post('/', protect, createGroup);
router.post('/:id/join', protect, joinGroup);

module.exports = router;
