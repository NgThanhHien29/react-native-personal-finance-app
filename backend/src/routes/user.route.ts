import express from "express";
import { createUser, loginUser } from "../controllers/user.controller";

const router = express.Router();
router.post("/auth/register", createUser);
router.post("/auth/login", loginUser);

export default router;
