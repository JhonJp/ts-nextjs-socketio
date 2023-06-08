import { useEffect, useState } from "react"
import socketIOClient from "socket.io-client"

const useSocket = () => {
    const [socketData, setSocketData] = useState("")

    useEffect(() => {
        let host = process.env.NEXT_PUBLIC_HOST
        let socket: any
        if(host) {
            socket = socketIOClient(host)
        } else {
            socket = socketIOClient()
        }
        socket.on("log", (data: any) => {
            setSocketData(data)
        })

        // CLEAN UP THE EFFECT
        return () => {socket.disconnect() }
    },[])

    return {
        socketData,
        setSocketData
    }
}

export default useSocket