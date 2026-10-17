import { Router } from "express";
import { submitEnquiry } from "../controllers/enquiryController.js";
import { enquirySubmissionLimiter } from "../middleware/rateLimiters.js";

const router = Router();

// POST /api/enquiries
router.post("/", enquirySubmissionLimiter, submitEnquiry);

export default router;
