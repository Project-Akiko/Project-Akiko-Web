import { getBase64 } from '../miscfunctions';
import { saveConversation } from '../api';

export const createUserMessage = async (text, image, messageSender) => {
    const now = new Date();
    const newMessage = {
        sender: messageSender.name,
        text: text,
        image: image ? await getBase64(image) : null, // convert image to base64 string
        avatar: messageSender.avatar,
        isIncoming: false,
        timestamp: now.getTime(),
    };
    return newMessage;
};

export const handleSaveConversation = async (conversationName, participants, messages) => {
    if(!conversationName) {
        console.log("No conversation name provided");
        return;
    }
    const NewConvo = {
        conversationName: conversationName,
        participants: participants,
        messages: messages,
    }
    await saveConversation(NewConvo);
}