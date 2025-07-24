import express from "express";

const statRoutes = express.Router();

statRoutes.get("/", (req, res) => {
  res.send("get stat route");
});

export default statRoutes;
