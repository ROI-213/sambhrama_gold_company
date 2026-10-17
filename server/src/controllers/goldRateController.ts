import type { Request, Response, NextFunction } from "express";
import { getDataStore, type GoldRateRecord } from "../services/db.js";
import { goldRateUpdateSchema } from "../validators/schemas.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

export function formatGoldRateResponse(record: GoldRateRecord) {
  const istFormatter = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  return {
    id: record.id,
    rate22k: Number(record.rate22k),
    rate24k: Number(record.rate24k),
    rate22kFormatted: record.rate22k,
    rate24kFormatted: record.rate24k,
    currency: record.currency || "INR",
    note: record.note ?? null,
    updatedAt: record.updatedAt.toISOString(),
    updatedAtIST: `${istFormatter.format(record.updatedAt)} IST`,
    updatedByName: record.updatedByName ?? null,
  };
}

export async function getPublicGoldRates(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const store = await getDataStore();
    const latest = await store.getLatestGoldRate();

    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

    if (!latest) {
      res.status(200).json({
        success: true,
        configured: false,
        data: null,
        message: "Rate not updated. Contact us for today's rate.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      configured: true,
      data: formatGoldRateResponse(latest),
    });
  } catch (error) {
    next(error);
  }
}

export async function updateGoldRates(
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

    const parsed = goldRateUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      res.status(400).json({
        success: false,
        error: firstIssue?.message || "Invalid gold rate values supplied.",
        issues: parsed.error.issues,
      });
      return;
    }

    const store = await getDataStore();
    const saved = await store.saveGoldRate({
      rate22k: parsed.data.rate22k,
      rate24k: parsed.data.rate24k,
      note: parsed.data.note ?? null,
      updatedById: req.admin.id,
    });

    res.status(200).json({
      success: true,
      message: "Gold rates updated and published successfully.",
      data: formatGoldRateResponse(saved),
    });
  } catch (error) {
    next(error);
  }
}

export async function getAdminGoldRateHistory(
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
    const history = await store.getGoldRateHistory(15);

    res.status(200).json({
      success: true,
      data: history.map(formatGoldRateResponse),
    });
  } catch (error) {
    next(error);
  }
}
