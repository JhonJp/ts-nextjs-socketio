import { useEffect, useState } from "react"
import socketIOClient from "socket.io-client"

const useSocket = () => {
    const [socketData, setSocketData] = useState("")

    useEffect(() => {
        let socket = socketIOClient()
        
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