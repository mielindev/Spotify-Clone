import express from "express";
import statController from "../controllers/stat.controller.js";
import { protectAdmin, protectRoute } from "../middlewares/auth.middleware.js";

const statRoutes = express.Router();

statRoutes.get("/", protectRoute, protectAdmin, statController.getStats);

export default statRoutes;
