import { DefaultEventsMap, Server } from 'socket.io';

interface IoProcessProps {
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}

const ioProcess = ({ io }: IoProcessProps) => {
  io.on('connection', (socket) => {
    console.log('client is connected', socket.id);

    socket.on('disconnect', (reason) => {
      console.log(`user is disconnected due to ${reason}`);
    });

    socket.on('error', (err) => {
      console.error('Socket.IO error:', err);
    });
  });
};

export default ioProcess;
