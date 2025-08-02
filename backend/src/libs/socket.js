import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import Message from "../models/message.model.js";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const userSockets = new Map();
const userActivities = new Map();

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  //   Handle user connection
  socket.on("userConnected", (userId) => {
    userSockets.set(userId, socket.id);
    userActivities.set(userId, "Idle");

    io.emit("userConnected", userId);
    socket.emit("userOnlines", Array.from(userSockets.keys()));

    io.emit("userActivity", Array.from(userActivities.entries()));
  });

  //   Handle user activity
  socket.on("updateActivity", ({ userId, activity }) => {
    console.log("updateActivityUpdated", userId, activity);
    userActivities.set(userId, activity);

    io.emit("userActivitiesUpdated", { userId, activity });
  });

  //   Handle user send message
  socket.on("sendMessage", async (data) => {
    try {
      const { senderId, receiverId, content } = data;

      const message = await Message.create({
        senderId,
        receiverId,
        content,
      });

      //   Send realtime message, if they're online
      const receiverSocketId = userSockets.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", message);
      }

      socket.emit("messageSent", message);
    } catch (error) {
      socket.emit("messageError", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    let disconnectedUserId;
    for (const [userId, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        disconnectedUserId = userId;
        userSockets.delete(userId);
        userActivities.delete(userId);
        break;
      }

      io.emit("userDisconnected", disconnectedUserId);
    }
  });
});

export { io, server, app };
