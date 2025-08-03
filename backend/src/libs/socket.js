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
  socket.on("user_connected", (userId) => {
    userSockets.set(userId, socket.id);
    userActivities.set(userId, "Idle");

    io.emit("user_connected", userId);
    socket.emit("users_online", Array.from(userSockets.keys()));

    io.emit("activities", Array.from(userActivities.entries()));
  });

  //   Handle user activity
  socket.on("update_activity", ({ userId, activity }) => {
    userActivities.set(userId, activity);

    io.emit("activities_updated", { userId, activity });
  });

  //   Handle user send message
  socket.on("send_message", async (data) => {
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
        io.to(receiverSocketId).emit("receive_message", message);
      }

      socket.emit("message_sent", message);
    } catch (error) {
      console.error("Error in send_message", error);
      socket.emit("message_error", error.message);
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
    }
    if (disconnectedUserId) {
      io.emit("user_disconnected", disconnectedUserId);
    }
  });
});

export { io, server, app };
