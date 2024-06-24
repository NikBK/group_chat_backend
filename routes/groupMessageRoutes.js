import { Router } from 'express';
import { sendMessage, likeMessage } from '../controllers/groupMessageController.js';


const router = Router();

router.post('/:groupId/messages/send', sendMessage);            // POST /api/groups/:groupId/messages/send              (Send message in group)
router.post('/:groupId/messages/:messageId/like', likeMessage); // POST /api/groups/:groupId/messages/:messageId/like   (Like message in group)

export { router };