import express from "express";
import { setCategory } from "../controllers/category.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();
router.post("/categories", auth, setCategory);

export default router;
