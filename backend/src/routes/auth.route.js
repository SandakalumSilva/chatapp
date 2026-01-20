import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";

router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", arcjetProtection, login);
router.post("/logout", logout);
router.post("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user),
);

export default router;
