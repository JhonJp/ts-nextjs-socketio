const dotenv = require('dotenv')
dotenv.config()
const next = require('next')

const express = require('express')
const httpM = require('http')
const socketIOM = require('socket.io');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async() => {
    const app = express();
    const server = httpM.createServer(app);
    const io = new socketIOM.Server();
    io.attach(server);

    let interval;

    app.get('/hello', async (_, res) => {
        res.send('Hello World')
    });

    io.on('connection', (socket) => {
        console.log('connection');
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => socket.emit("log", new Date()), 1000)

        socket.on('disconnect', () => {
            console.log('client disconnected');
        })
    });

    app.all('*', (req, res) => nextHandler(req, res));

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});