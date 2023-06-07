const dotenv = require('dotenv')
const socketio = require('socket.io')
dotenv.config()
const { createServer } = require('http')
const next = require('next')

const port = process.env.PORT || 3005
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    let server = createServer((req, res) => {
        handle(req, res)
    }).listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on <http://localhost>:${port}`)
    })
    const io = socketio(server)

    let interval;

    io.on("connection", (socket) => {
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => getApiAndEmit(socket), 1000)
        socket.on("disconnect", () => {
            clearInterval(interval)
        });
    });

    const getApiAndEmit = socket => {
        const response = new Date()
        // Emitting a new message. Will be consumed by the client
        socket.emit("log", response)
    }
})