import express from "express";
import albumController from "../controllers/album.controller.js";

const albumRoutes = express.Router();

albumRoutes.get("/", albumController.getAllAlbums);
albumRoutes.get("/:albumId", albumController.getAlbumDetails);

export default albumRoutes;
