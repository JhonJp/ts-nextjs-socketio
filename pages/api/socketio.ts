import { Server } from 'socket.io';

const ioHandler = (_req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io');
    const io = new Server(res.socket.server);
    let interval: any
    io.on('connection', socket => {
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => getApiAndEmit(socket), 1000)
        socket.on("disconnect", () => {
            clearInterval(interval)
        });
    });

    const getApiAndEmit = (socket: any) => {
        const response = new Date()
        // Emitting a new message. Will be consumed by the client
        socket.emit("log", response)
    }

    res.socket.server.io = io;
  } else {
    console.log('socket.io already running');
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false
  }
};

export default ioHandler;