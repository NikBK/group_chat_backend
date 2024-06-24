import { Router } from 'express';
import { sendMessage, likeMessage } from '../controllers/groupMessageController.js';


const router = Router();

router.post('/:groupId/messages/send', sendMessage); // POST route to send a message to a group
router.post('/:groupId/messages/:messageId/like', likeMessage); // POST route to like a group message

export { router };