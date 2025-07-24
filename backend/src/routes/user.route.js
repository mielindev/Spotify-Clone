import express from "express";

const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
  res.send("get user route");
});

export default userRoutes;
