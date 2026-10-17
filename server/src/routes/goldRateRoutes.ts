import { Router } from "express";
import { getPublicGoldRates } from "../controllers/goldRateController.js";
import { publicApiLimiter } from "../middleware/rateLimiters.js";

const router = Router();

// GET /api/gold-rates
router.get("/", publicApiLimiter, getPublicGoldRates);

export default router;
