import { GroupMessage } from '../models/GroupMessage.js';


async function sendMessage(req, res) {
    const { groupId } = req.params;
    const { messageContent } = req.body;
    const { userId: senderId } = req.user;

    try {
        const newMessage = new GroupMessage({
            group: groupId,
            sender: senderId,
            text: messageContent,
        });

        const savedMessage = await newMessage.save();
        res.json({ success: true, message: savedMessage });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message.' });
    }
}

async function likeMessage(req, res) {
    const { groupId, messageId } = req.params;
    const { userId } = req.user;

    try {
        const message = await GroupMessage.findOne({ _id: messageId, group: groupId });
        if (!message) {
            return res.status(404).json({ error: 'Message not found.' });
        }

        if (message.likes.includes(userId)) {
            return res.status(400).json({ error: 'User already liked this message.' });
        }

        message.likes.push(userId);
        await message.save();

        res.json({ success: true, message });
    } catch (error) {
        console.error('Error liking message:', error);
        res.status(500).json({ error: 'Failed to like message.' });
    }
}

export { sendMessage, likeMessage };