// server.ts
import { createServer } from 'http';
import app from './app';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import ioProcess from './utils/io';

config();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // 올바른 CORS 설정
  },
});

ioProcess({ io });

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log('Server listening on port', port);
});
