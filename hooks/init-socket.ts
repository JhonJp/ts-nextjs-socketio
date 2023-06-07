import { useEffect, useState } from "react"
import io from "socket.io-client"
import axios from 'axios'

const useSocket = () => {
    const [socketData, setSocketData] = useState("")

    useEffect(() => {
        let host = process.env.SOCKET_API ? process.env.SOCKET_API : '/api/socketio'        
        const socketio = io();
        axios.get(host).finally(()=>{
            socketio.on("log", (data: any) => {
                setSocketData(data)
            })
        })        

        return () => { socketio.disconnect() }
    },[])

    return {
        socketData,
        setSocketData
    }
}

export default useSocket