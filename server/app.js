const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const connectDB = require("./config/db");

// Initialize 
dotenv.config();
const app = express();

// Connect
connectDB();

// CORS 
const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true,
};

// Apply CORS middleware before any routes
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/user", userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});


const server = createServer(app);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true, 
  },
});


//user
const user = {}

io.on("connection", async (socket) => {
  // console.log("User is connected and id is: " + socket.id);

  //getting and sending messages
  socket.on("data", (msg,res) => {
    // console.log("Message is " + msg);
    res({status:"ok"})
    // io.emit("data", { name: "Server", message: msg.message });
    socket.broadcast.emit("data", { name:msg.name, message: msg.message });
  });

  //Register
  socket.on("register",(username)=>{
    user[username] = socket.id;
    // console.log(`User ${username} connected with socket ID: ${socket.id}`);
  })

  //sending private message
  socket.on("private_message",({to,data})=>{
    const recipitentSocketId = user[to]
    if(recipitentSocketId){
      // console.log(`User ${to} connected socket ID: sender: ${socket.id}  recipitant:  ${recipitentSocketId} with msg ${data.message  }`);
      io.to(recipitentSocketId).emit("private_message",{
        from : Object.keys(user).find(key=>user[key]===socket.id),
        message:data.message
      })
    }
  })

});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server is starting at port: " + PORT);
});
