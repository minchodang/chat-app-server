import { UserInfo } from '../models/user';
import Chat from '../models/chat';

interface SaveChatArguments {
  message: string;
  user: UserInfo;
}

const chatController = {
  saveChat: async ({ message, user }: SaveChatArguments) => {
    const newMessage = new Chat({
      chat: message,
      user: {
        id: user._id,
        name: user.name,
      },
    });
    await newMessage.save();
    return newMessage;
  },
};

export default chatController;
