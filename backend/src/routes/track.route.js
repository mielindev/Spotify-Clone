import express from "express";

const trackRoutes = express.Router();

trackRoutes.get("/", (req, res) => {
  res.send("get track route");
});

export default trackRoutes;
