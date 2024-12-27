import React, { useEffect, useState } from 'react';
import ChatBubble from './ChatBubble';
import ChatBubbleSender from './ChatBubbleSender';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router';

const socket = io("http://localhost:3003", { transports: ['websocket'] });

function Page() {
  const [name, setName] = useState("Avadhut");
  const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [receiver, setReceiver] = useState("user1");
  const [serverMessages, setServerMessages] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuthenticated(true);
    }
    setLoading(false);

    // Setup socket listeners
    socket.on("connect", () => {
      console.log("Server is connected with id: " + socket.id);
    });

    socket.on("private_message", ({ from, message }) => {
      console.log("Message received from:", from);
      const dataClient = { name: from, message, f: false };
      setServerMessages((prev) => [...prev, dataClient]);
    });

    // Register the user on the server
    socket.emit("register", Cookies.get("username"));

    // Cleanup on component unmount
    return () => {
      socket.off("connect");
      socket.off("private_message");
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove('token');
    Cookies.remove('username');
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName = Cookies.get("username");
    const data = { name: userName, message };

    // Send private message
    socket.emit("private_message", { to: receiver, data });

    // Add the sent message to the local state
    const dataClient = { name: userName, message, f: true };
    setServerMessages((prev) => [...prev, dataClient]);
    setMessage("");
  };

  const time = "12:23 PM";
  const status = "online";

  return (
    <div className="flex gap-2 h-screen w-full">
      <div className="contacts w-[85vh] p-2 bg-red-100 h-full overflow-scroll">
        <input className="h-10 w-full bg-red-300 p-2 font-bold text-xl my-2" onChange={(e)=>{setReceiver(e.target.valuew)}}/>
        <button className='w-full bg-blue-600 h-8 rounded-lg text-white'>Set</button>
      </div>
      <div className="chat-area w-full bg-blue-100 h-full overflow-scroll relative">
        <div className="w-full h-8 text-center bg-pink-400">{receiver}</div>

        {/* Render chat bubbles */}
        {serverMessages.map((msg, idx) =>
          msg.f ? (
            <ChatBubbleSender
              key={idx}
              name={msg.name}
              time={time}
              message={msg.message}
              status={status}
            />
          ) : (
            <ChatBubble
              key={idx}
              name={msg.name}
              time={time}
              message={msg.message}
              status={status}
            />
          )
        )}

        <div className="bottom-12 absolute flex items-center md:w-[146.5vh] justify-center h-16 bg-red-200">
          <input
            type="text"
            className="h-12 w-full p-1 bg-blue-200 m-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="h-12 w-24 bg-blue-600 m-2 rounded-xl text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
