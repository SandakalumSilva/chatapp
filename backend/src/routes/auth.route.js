import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import { protectRoute } from "../middleware/auth.middleware.js";

import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/update-profile", protectRoute, updateProfile);

export default router;
