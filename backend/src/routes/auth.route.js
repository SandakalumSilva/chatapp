import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import { signup, login, logout } from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
