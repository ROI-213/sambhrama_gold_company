import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { env } from "../config/env.js";
import { getDataStore } from "../services/db.js";
import { adminLoginSchema } from "../validators/schemas.js";
import { hashSessionToken, type AuthenticatedRequest } from "../middleware/auth.js";
import { formatGoldRateResponse } from "./goldRateController.js";

export async function loginAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const parsed = adminLoginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        error: parsed.error.issues[0]?.message || "Invalid login credentials format.",
      });
      return;
    }

    const { email, password } = parsed.data;
    const store = await getDataStore();
    const admin = await store.findAdminByEmail(email);

    if (!admin) {
      // Mitigate timing attacks with dummy comparison
      await bcrypt.compare(password, "$2b$12$invalidhashplaceholder000000000000000000000000000000");
      res.status(401).json({
        success: false,
        error: "Invalid administrator email or password.",
      });
      return;
    }

    const passwordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordValid) {
      res.status(401).json({
        success: false,
        error: "Invalid administrator email or password.",
      });
      return;
    }

    await store.deleteExpiredSessions();

    const rawSessionToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = hashSessionToken(rawSessionToken);
    const csrfToken = crypto.randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + env.sessionTtlHours * 60 * 60 * 1000);

    await store.createSession({
      tokenHash,
      csrfToken,
      adminId: admin.id,
      expiresAt,
      ipAddress: req.ip || null,
      userAgent: req.get("user-agent") || null,
    });

    res.cookie(env.sessionCookieName, rawSessionToken, {
      httpOnly: true,
      secure: env.cookieSecure,
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
      csrfToken,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    next(error);
  }
}

export async function logoutAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const rawToken = req.cookies?.[env.sessionCookieName];
    if (rawToken && typeof rawToken === "string") {
      const store = await getDataStore();
      await store.deleteSessionByTokenHash(hashSessionToken(rawToken));
    }

    res.clearCookie(env.sessionCookieName, {
      httpOnly: true,
      secure: env.cookieSecure,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export async function getAdminSession(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.admin || !req.adminSession) {
      res.status(401).json({
        success: false,
        authenticated: false,
        error: "Not authenticated.",
      });
      return;
    }

    const store = await getDataStore();
    const latestRate = await store.getLatestGoldRate();

    res.status(200).json({
      success: true,
      authenticated: true,
      admin: {
        id: req.admin.id,
        email: req.admin.email,
        name: req.admin.name,
      },
      csrfToken: req.adminSession.csrfToken,
      expiresAt: req.adminSession.expiresAt.toISOString(),
      currentGoldRate: latestRate ? formatGoldRateResponse(latestRate) : null,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAdminEnquiries(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.admin) {
      res.status(401).json({
        success: false,
        error: "Administrator authentication required.",
      });
      return;
    }

    const store = await getDataStore();
    const enquiries = await store.listEnquiries(50);

    res.status(200).json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
}
