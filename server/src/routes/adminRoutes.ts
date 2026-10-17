import { Router } from "express";
import {
  loginAdmin,
  logoutAdmin,
  getAdminSession,
  getAdminEnquiries,
} from "../controllers/adminController.js";
import {
  updateGoldRates,
  getAdminGoldRateHistory,
} from "../controllers/goldRateController.js";
import { requireAdminAuth } from "../middleware/auth.js";
import { adminLoginLimiter } from "../middleware/rateLimiters.js";

const router = Router();

// POST /api/admin/login
router.post("/login", adminLoginLimiter, loginAdmin);

// POST /api/admin/logout
router.post("/logout", requireAdminAuth, logoutAdmin);

// GET /api/admin/session
router.get("/session", requireAdminAuth, getAdminSession);

// PUT /api/admin/gold-rates
router.put("/gold-rates", requireAdminAuth, updateGoldRates);

// GET /api/admin/gold-rates/history
router.get("/gold-rates/history", requireAdminAuth, getAdminGoldRateHistory);

// GET /api/admin/enquiries
router.get("/enquiries", requireAdminAuth, getAdminEnquiries);

export default router;
