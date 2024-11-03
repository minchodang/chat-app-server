// server.ts
import { createServer } from 'http';
import app from './app';
import { Server } from 'socket.io';
import { config } from 'dotenv';

config();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // 올바른 CORS 설정
  },
});

io.on('connection', (socket) => {
  console.log('client is connected', socket.id);
  socket.on('disconnect', (reason) => {
    console.log(`user is disconnected due to ${reason}`);
  });

  socket.on('error', (err) => {
    console.error('Socket.IO error:', err);
  });
});

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log('Server listening on port', port);
});
