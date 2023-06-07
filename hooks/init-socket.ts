import { useEffect, useState } from "react"
import socketIOClient from "socket.io-client"

const useSocket = () => {
    const [socketData, setSocketData] = useState("")

    useEffect(() => {
        let host = process.env.NEXT_PUBLIC_VERCEL_HOST ? process.env.NEXT_PUBLIC_VERCEL_HOST : ''
        let socket = socketIOClient(host)
        
        socket.on("log", (data: any) => {
            setSocketData(data)
        })

        return () => { socket.disconnect() }
    },[])

    return {
        socketData,
        setSocketData
    }
}

export default useSocket