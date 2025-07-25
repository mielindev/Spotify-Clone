import express from "express";
import trackController from "../controllers/track.controller.js";
import { protectAdmin, protectRoute } from "../middlewares/auth.middleware.js";

const trackRoutes = express.Router();

trackRoutes.get("/", protectRoute, protectAdmin, trackController.getAllTracks);
trackRoutes.get("/featured", trackController.getFeaturedTracks);
trackRoutes.get("/made-for-you", trackController.getMadeForYouTracks);
trackRoutes.get("/trending", trackController.getTrendingTracks);

export default trackRoutes;
