const router = require('express').Router();
const { sendMessage, likeMessage } = require('../controllers/groupMessageController');

router.post('/:groupId/messages/send', sendMessage); // POST route to send a message to a group
router.post('/:groupId/messages/:messageId/like', likeMessage); // POST route to like a group message

module.exports = router;