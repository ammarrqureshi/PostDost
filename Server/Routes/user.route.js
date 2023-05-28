import express from "express";
import { deleteUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const userRoutes = express.Router();

// userRoutes.delete("/:id", verifyToken, deleteUser);
userRoutes.get("/:id", getUser);

export default userRoutes;
