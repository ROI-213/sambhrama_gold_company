import express, { type Request, type Response, type NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import goldRateRoutes from "./routes/goldRateRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);

  // Security headers via Helmet
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  // Controlled CORS with credentials for HttpOnly session cookies
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) {
          callback(null, true);
          return;
        }
        if (
          env.clientOrigins.includes(origin) ||
          env.nodeEnv === "development" ||
          env.nodeEnv === "test"
        ) {
          callback(null, true);
          return;
        }
        callback(new Error("Origin not allowed by CORS policy"));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "X-CSRF-Token"],
    })
  );

  app.use(cookieParser());
  app.use(express.json({ limit: "64kb" }));
  app.use(express.urlencoded({ extended: false, limit: "64kb" }));

  // Healthcheck
  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      service: "Sambhrama Gold Company API",
      timestamp: new Date().toISOString(),
    });
  });

  // Core API routes
  app.use("/api/gold-rates", goldRateRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/enquiries", enquiryRoutes);

  // 404 handler for unknown API routes
  app.use("/api/*", (_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: "Requested API endpoint does not exist.",
    });
  });

  // Safe centralized error handler
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error("[API Error]:", err);
    res.status(500).json({
      success: false,
      error:
        "An unexpected server error occurred. Please try again later or contact us directly.",
    });
  });

  return app;
}
