import { DefaultEventsMap, Server } from 'socket.io';
import userController from '../Controllers/user.controller';

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

        cb({ ok: true, data: user });
      } catch (error) {
        if (error instanceof Error) cb({ ok: false, error: error.message });
      }
    });
    socket.on('sendMessage', async (message, cb) => {

      
    });

    socket.on('error', (err) => {
      console.error('Socket.IO error:', err);
    });
  });
};

export default ioProcess;
