import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import userController from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/", protectRoute, userController.getAllUsers);

export default userRoutes;
