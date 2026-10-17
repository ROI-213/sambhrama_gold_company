import type { Request, Response, NextFunction } from "express";
import crypto from "node:crypto";
import { env } from "../config/env.js";
import { getDataStore, type AdminRecord, type AdminSessionRecord } from "../services/db.js";

export interface AuthenticatedRequest extends Request {
  admin?: AdminRecord;
  adminSession?: AdminSessionRecord;
}

export function hashSessionToken(rawToken: string): string {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

export async function requireAdminAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const rawToken = req.cookies?.[env.sessionCookieName];
    if (!rawToken || typeof rawToken !== "string") {
      res.status(401).json({
        success: false,
        error: "Authentication required. Please log in as an administrator.",
      });
      return;
    }

    const tokenHash = hashSessionToken(rawToken);
    const store = await getDataStore();
    const session = await store.findSessionByTokenHash(tokenHash);

    if (!session) {
      res.clearCookie(env.sessionCookieName, { path: "/" });
      res.status(401).json({
        success: false,
        error: "Invalid or expired session. Please log in again.",
      });
      return;
    }

    if (session.expiresAt.getTime() < Date.now()) {
      await store.deleteSessionByTokenHash(tokenHash);
      res.clearCookie(env.sessionCookieName, { path: "/" });
      res.status(401).json({
        success: false,
        error: "Session has expired. Please log in again.",
      });
      return;
    }

    // Enforce CSRF token validation for state-mutating requests
    const mutatingMethods = ["POST", "PUT", "PATCH", "DELETE"];
    if (mutatingMethods.includes(req.method.toUpperCase())) {
      const csrfHeader = req.headers["x-csrf-token"];
      if (!csrfHeader || typeof csrfHeader !== "string" || csrfHeader !== session.csrfToken) {
        res.status(403).json({
          success: false,
          error: "CSRF token validation failed. Please refresh and try again.",
        });
        return;
      }
    }

    req.admin = session.admin;
    req.adminSession = session;
    next();
  } catch (error) {
    next(error);
  }
}
