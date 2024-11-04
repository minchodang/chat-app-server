import { DefaultEventsMap, Server } from 'socket.io';
import userController from '../Controllers/user.controller';
import chatController from '../Controllers/chat.controller';

interface IoProcessProps {
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}

const ioProcess = ({ io }: IoProcessProps) => {
  io.on('connection', (socket) => {
    console.log('client is connected', socket.id);
    socket.on('disconnect', (reason) => {
      console.log(`user is disconnected due to ${reason}`);
    });
    socket.on('login', async (userName, cb) => {
      try {
        const user = await userController.saveUser({ userName, sid: socket.id });
        const welcomeMessage = {
          chat: `${user.name}가 입장했습니다.`,
          user: { id: null, name: 'system' },
        };
        io.emit('message', welcomeMessage);
        cb({ ok: true, data: user });
      } catch (error) {
        if (error instanceof Error) cb({ ok: false, error: error.message });
      }
    });
    socket.on('sendMessage', async (message, cb) => {
      try {
        const user = await userController.checkUser({ sid: socket.id });
        const newMessage = await chatController.saveChat({ message, user });
        io.emit('message', newMessage);
        cb({ ok: true });
      } catch (error) {
        if (error instanceof Error) cb({ ok: false, error: error.message });
      }
    });

    socket.on('error', (err) => {
      console.error('Socket.IO error:', err);
    });
  });
};

export default ioProcess;
