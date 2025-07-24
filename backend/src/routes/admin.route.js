import express from "express";
import adminController from "../controllers/admin.controller.js";
import { protectAdmin, protectRoute } from "../middlewares/auth.middleware.js";

const adminRoutes = express.Router();

adminRoutes.use(protectRoute, protectAdmin);

adminRoutes.post("/tracks", adminController.addTrack);

adminRoutes.delete("/tracks/:trackId", adminController.deleteTrack);

adminRoutes.post("/albums", adminController.createAlbum);

adminRoutes.delete("/albums/:albumId", adminController.deleteAlbum);
export default adminRoutes;
