import express from "express";
import adminController from "../controllers/admin.controller.js";

const adminRoutes = express.Router();

adminRoutes.get("/", adminController.getAdmin);

export default adminRoutes;
