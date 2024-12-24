import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client'
import Cookies from "js-cookie"
import { Navigate } from 'react-router'
// const socket = io("http://localhost:3003",{transports: ['websocket'],})

function Message() {
    const [authenticated,setAuthenticated] = useState(false)
    const [loading,setLoading] = useState(true)
    const [message,setMessage] = useState('');
    const [receiver,setReceiver] = useState('');
    const [serverMessages,setServerMessages] = useState([]);

    
    //UseEffects
    useEffect(()=>{
        const token = Cookies.get("token");
        if(token){
            setAuthenticated(true)
        }
        setLoading(false)

        socket.on("connect",(Server)=>{
            console.log("Server is Connected with id: "+socket.id)
            // socket.on("data",(data)=>{
            //     setServerMessages((pre)=>[...pre,dataClient])
            //     setServerMessages((pre)=>[...pre,dataClient])
            // })
            socket.on("private_message",({from,message})=>{
                const dataClient ={name:from,message,f:false}
                setServerMessages((pre)=>[...pre,dataClient])
            })
        })

        //register
        socket.emit("register",Cookies.get("username"))
        return () => {
            socket.off("connect");
            socket.off("data");
        };
        
    },[])

    if(loading){
        return <div>Loading</div>
    }    
    if(!authenticated){
        console.log("not")
        return <Navigate to="/login"/>
    }
    
    const handleLogout=(e)=>{
        e.preventDefault();
        Cookies.remove('token')
        Cookies.remove('username')
        window.location.reload();
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const userName = Cookies.get("username");
        const data ={name:userName,message}

        //broadcasting
        // socket.emit("data",data,(res)=>{
        //     console.log("ok")
        // })

        //private messgae
        //sending
        socket.emit("private_message",{to:receiver,data:data})

        //storing the message
        const dataClient ={name:userName,message,f:true}
        setServerMessages((pre)=>[...pre,dataClient])
        setMessage("");
        setReceiver("")
    }

  return (
    <div className='h-screen w-full'>
        <div className="h-full w-full bg-blue-50">
            {serverMessages.map((data,idx)=><li key={idx} className={`font-bold h-8 m-1 p-1 ${data.f ? "bg-red-200" : "bg-blue-200"}`} >{data.name} : {data.message}</li>)}
        </div>
        <div className="bottom-0 absolute flex items-center  justify-center w-full h-16 bg-red-200">
            <button className='h-12 w-24 bg-red-600 m-2 rounded-xl text-white' onClick={handleLogout}>Logout</button>
            <input type="text" className='h-12 w-full p-1 bg-blue-200 m-2' value={receiver} onChange={e=>{setReceiver(e.target.value)}}  />
            <input type="text" className='h-12 w-full p-1 bg-blue-200 m-2' value={message} onChange={e=>{setMessage(e.target.value)}}  />
            <button className='h-12 w-24 bg-blue-600 m-2 rounded-xl text-white' onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default Message