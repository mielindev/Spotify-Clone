import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import userController from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/", protectRoute, userController.getAllUsers);
userRoutes.get("/message/:userId", protectRoute, userController.getMessages);

export default userRoutes;
