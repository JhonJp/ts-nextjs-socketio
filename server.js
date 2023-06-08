const dotenv = require('dotenv')
dotenv.config()
const { createServer } = require('http')
const next = require('next')

const port = process.env.NEXT_PUBLIC_PORT || 3005
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    let server = createServer((req, res) => {
        handle(req, res)
    })
    
    const io = require('socket.io')(server, { path: '/socket.io/'})

    let interval;

    io.on("connection", (socket) => {
        console.info("New client connected")
        if (interval) {
          clearInterval(interval)
        }
        interval = setInterval(() => getApiAndEmit(socket), 1000)
        socket.on("disconnect", () => {
          console.info("Client disconnected")
          clearInterval(interval)
        });
    });
      
    const getApiAndEmit = socket => {
        const response = new Date()
        // Emitting a new message. Will be consumed by the client
        socket.emit("log", response)
    };
    
    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on <http://localhost>:${port}`)
    })
})