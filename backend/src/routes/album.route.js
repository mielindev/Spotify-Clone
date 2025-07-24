import express from "express";

const albumRoutes = express.Router();

albumRoutes.get("/", (req, res) => {
  res.send("get album route");
});

export default albumRoutes;
