import { useEffect, useState } from "react"
import io from "socket.io-client"
import axios from 'axios'

const useSocket = () => {
    const [socketData, setSocketData] = useState("")
    const [socket, setSocket] = useState<any>(null)
    useEffect(() => {
        let host = process.env.SOCKET_API ? process.env.SOCKET_API : '/api/socketio'  
        axios.get(host).finally(()=>{      
            const socketio = io();
            socketio.on("log", (data: any) => {
                setSocketData(data)
            })
            socketio.on('disconnect', () => {
                console.log('disconnect');
            });
            setSocket(socketio);
        })        

        return () => { socket?.disconnect() }
    },[])

    return {
        socketData,
        setSocketData
    }
}

export default useSocket