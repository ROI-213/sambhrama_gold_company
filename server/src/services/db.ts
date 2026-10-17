import { PrismaClient, Prisma } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { env } from "../config/env.js";

/**
 * Storage repository interface for Sambhrama Gold Company.
 * Uses PostgreSQL via PrismaClient in production/configured environments,
 * with a seamless local JSON-backed fallback store if DATABASE_URL is not reachable
 * in local preview/testing environments so all APIs work out-of-the-box.
 */
export interface AdminRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminSessionRecord {
  id: string;
  tokenHash: string;
  csrfToken: string;
  adminId: string;
  admin?: AdminRecord;
  expiresAt: Date;
  createdAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
}

export interface GoldRateRecord {
  id: string;
  rate22k: string; // Decimal formatted to 2 decimal places e.g. "6850.00"
  rate24k: string; // Decimal formatted to 2 decimal places e.g. "7470.00"
  currency: string;
  note: string | null;
  updatedAt: Date;
  updatedById: string | null;
  updatedByName?: string | null;
}

export interface EnquiryRecord {
  id: string;
  enquiryType: string;
  fullName: string;
  mobile: string;
  email: string | null;
  city: string | null;
  serviceRequired: string | null;
  goldType: string | null;
  approxWeightGrams: string | null;
  propertyRequirement: string | null;
  preferredLocation: string | null;
  loanType: string | null;
  loanRequirement: string | null;
  subject: string | null;
  message: string;
  ipAddress: string | null;
  createdAt: Date;
}

export interface DataStore {
  findAdminByEmail(email: string): Promise<AdminRecord | null>;
  findAdminById(id: string): Promise<AdminRecord | null>;
  upsertAdmin(data: { email: string; name: string; passwordHash: string }): Promise<AdminRecord>;
  createSession(data: {
    tokenHash: string;
    csrfToken: string;
    adminId: string;
    expiresAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
  }): Promise<AdminSessionRecord>;
  findSessionByTokenHash(tokenHash: string): Promise<(AdminSessionRecord & { admin: AdminRecord }) | null>;
  deleteSessionByTokenHash(tokenHash: string): Promise<void>;
  deleteExpiredSessions(): Promise<void>;
  getLatestGoldRate(): Promise<GoldRateRecord | null>;
  getGoldRateHistory(limit?: number): Promise<GoldRateRecord[]>;
  saveGoldRate(data: {
    rate22k: number | string;
    rate24k: number | string;
    note?: string | null;
    updatedById: string;
  }): Promise<GoldRateRecord>;
  createEnquiry(data: Omit<EnquiryRecord, "id" | "createdAt">): Promise<EnquiryRecord>;
  listEnquiries(limit?: number): Promise<EnquiryRecord[]>;
}

function formatDecimal(val: number | string | Prisma.Decimal): string {
  const num = typeof val === "number" ? val : Number(val.toString());
  return num.toFixed(2);
}

class PrismaDataStore implements DataStore {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAdminByEmail(email: string): Promise<AdminRecord | null> {
    return this.prisma.admin.findUnique({ where: { email: email.toLowerCase() } });
  }

  async findAdminById(id: string): Promise<AdminRecord | null> {
    return this.prisma.admin.findUnique({ where: { id } });
  }

  async upsertAdmin(data: { email: string; name: string; passwordHash: string }): Promise<AdminRecord> {
    const normalizedEmail = data.email.toLowerCase();
    return this.prisma.admin.upsert({
      where: { email: normalizedEmail },
      update: {
        name: data.name,
        passwordHash: data.passwordHash,
      },
      create: {
        email: normalizedEmail,
        name: data.name,
        passwordHash: data.passwordHash,
      },
    });
  }

  async createSession(data: {
    tokenHash: string;
    csrfToken: string;
    adminId: string;
    expiresAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
  }): Promise<AdminSessionRecord> {
    return this.prisma.adminSession.create({
      data: {
        tokenHash: data.tokenHash,
        csrfToken: data.csrfToken,
        adminId: data.adminId,
        expiresAt: data.expiresAt,
        ipAddress: data.ipAddress ?? null,
        userAgent: data.userAgent ?? null,
      },
    });
  }

  async findSessionByTokenHash(
    tokenHash: string
  ): Promise<(AdminSessionRecord & { admin: AdminRecord }) | null> {
    return this.prisma.adminSession.findUnique({
      where: { tokenHash },
      include: { admin: true },
    });
  }

  async deleteSessionByTokenHash(tokenHash: string): Promise<void> {
    await this.prisma.adminSession.deleteMany({ where: { tokenHash } });
  }

  async deleteExpiredSessions(): Promise<void> {
    await this.prisma.adminSession.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  }

  async getLatestGoldRate(): Promise<GoldRateRecord | null> {
    const record = await this.prisma.goldRate.findFirst({
      orderBy: { updatedAt: "desc" },
      include: { updatedBy: true },
    });
    if (!record) return null;
    return {
      id: record.id,
      rate22k: formatDecimal(record.rate22k),
      rate24k: formatDecimal(record.rate24k),
      currency: record.currency,
      note: record.note,
      updatedAt: record.updatedAt,
      updatedById: record.updatedById,
      updatedByName: record.updatedBy?.name ?? null,
    };
  }

  async getGoldRateHistory(limit = 10): Promise<GoldRateRecord[]> {
    const records = await this.prisma.goldRate.findMany({
      orderBy: { updatedAt: "desc" },
      take: limit,
      include: { updatedBy: true },
    });
    return records.map((record) => ({
      id: record.id,
      rate22k: formatDecimal(record.rate22k),
      rate24k: formatDecimal(record.rate24k),
      currency: record.currency,
      note: record.note,
      updatedAt: record.updatedAt,
      updatedById: record.updatedById,
      updatedByName: record.updatedBy?.name ?? null,
    }));
  }

  async saveGoldRate(data: {
    rate22k: number | string;
    rate24k: number | string;
    note?: string | null;
    updatedById: string;
  }): Promise<GoldRateRecord> {
    const created = await this.prisma.goldRate.create({
      data: {
        rate22k: new Prisma.Decimal(formatDecimal(data.rate22k)),
        rate24k: new Prisma.Decimal(formatDecimal(data.rate24k)),
        currency: "INR",
        note: data.note ?? null,
        updatedById: data.updatedById,
      },
      include: { updatedBy: true },
    });
    return {
      id: created.id,
      rate22k: formatDecimal(created.rate22k),
      rate24k: formatDecimal(created.rate24k),
      currency: created.currency,
      note: created.note,
      updatedAt: created.updatedAt,
      updatedById: created.updatedById,
      updatedByName: created.updatedBy?.name ?? null,
    };
  }

  async createEnquiry(data: Omit<EnquiryRecord, "id" | "createdAt">): Promise<EnquiryRecord> {
    const created = await this.prisma.enquiry.create({
      data: {
        enquiryType: data.enquiryType,
        fullName: data.fullName,
        mobile: data.mobile,
        email: data.email,
        city: data.city,
        serviceRequired: data.serviceRequired,
        goldType: data.goldType,
        approxWeightGrams: data.approxWeightGrams
          ? new Prisma.Decimal(formatDecimal(data.approxWeightGrams))
          : null,
        propertyRequirement: data.propertyRequirement,
        preferredLocation: data.preferredLocation,
        loanType: data.loanType,
        loanRequirement: data.loanRequirement,
        subject: data.subject,
        message: data.message,
        ipAddress: data.ipAddress,
      },
    });
    return {
      ...created,
      approxWeightGrams: created.approxWeightGrams
        ? formatDecimal(created.approxWeightGrams)
        : null,
    };
  }

  async listEnquiries(limit = 50): Promise<EnquiryRecord[]> {
    const records = await this.prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return records.map((r) => ({
      ...r,
      approxWeightGrams: r.approxWeightGrams ? formatDecimal(r.approxWeightGrams) : null,
    }));
  }
}

interface FileDatabaseSchema {
  admins: AdminRecord[];
  sessions: AdminSessionRecord[];
  goldRates: GoldRateRecord[];
  enquiries: EnquiryRecord[];
}

export class FileFallbackDataStore implements DataStore {
  private filePath: string;

  constructor(customFilePath?: string) {
    this.filePath =
      customFilePath ||
      path.resolve(process.cwd(), ".data", "sambhrama-store.json");
    this.ensureFile();
  }

  private ensureFile() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      const initial: FileDatabaseSchema = {
        admins: [],
        sessions: [],
        goldRates: [],
        enquiries: [],
      };
      fs.writeFileSync(this.filePath, JSON.stringify(initial, null, 2), "utf8");
    }
  }

  private read(): FileDatabaseSchema {
    this.ensureFile();
    const raw = fs.readFileSync(this.filePath, "utf8");
    const parsed = JSON.parse(raw) as FileDatabaseSchema;
    return {
      admins: (parsed.admins || []).map((a) => ({
        ...a,
        createdAt: new Date(a.createdAt),
        updatedAt: new Date(a.updatedAt),
      })),
      sessions: (parsed.sessions || []).map((s) => ({
        ...s,
        expiresAt: new Date(s.expiresAt),
        createdAt: new Date(s.createdAt),
      })),
      goldRates: (parsed.goldRates || []).map((g) => ({
        ...g,
        updatedAt: new Date(g.updatedAt),
      })),
      enquiries: (parsed.enquiries || []).map((e) => ({
        ...e,
        createdAt: new Date(e.createdAt),
      })),
    };
  }

  private write(data: FileDatabaseSchema) {
    this.ensureFile();
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf8");
  }

  async findAdminByEmail(email: string): Promise<AdminRecord | null> {
    const db = this.read();
    return db.admins.find((a) => a.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async findAdminById(id: string): Promise<AdminRecord | null> {
    const db = this.read();
    return db.admins.find((a) => a.id === id) || null;
  }

  async upsertAdmin(data: { email: string; name: string; passwordHash: string }): Promise<AdminRecord> {
    const db = this.read();
    const normalizedEmail = data.email.toLowerCase();
    const existingIndex = db.admins.findIndex((a) => a.email === normalizedEmail);
    const now = new Date();
    if (existingIndex >= 0) {
      db.admins[existingIndex] = {
        ...db.admins[existingIndex],
        name: data.name,
        passwordHash: data.passwordHash,
        updatedAt: now,
      };
      this.write(db);
      return db.admins[existingIndex];
    }
    const created: AdminRecord = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      name: data.name,
      passwordHash: data.passwordHash,
      createdAt: now,
      updatedAt: now,
    };
    db.admins.push(created);
    this.write(db);
    return created;
  }

  async createSession(data: {
    tokenHash: string;
    csrfToken: string;
    adminId: string;
    expiresAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
  }): Promise<AdminSessionRecord> {
    const db = this.read();
    const session: AdminSessionRecord = {
      id: crypto.randomUUID(),
      tokenHash: data.tokenHash,
      csrfToken: data.csrfToken,
      adminId: data.adminId,
      expiresAt: data.expiresAt,
      createdAt: new Date(),
      ipAddress: data.ipAddress ?? null,
      userAgent: data.userAgent ?? null,
    };
    db.sessions.push(session);
    this.write(db);
    return session;
  }

  async findSessionByTokenHash(
    tokenHash: string
  ): Promise<(AdminSessionRecord & { admin: AdminRecord }) | null> {
    const db = this.read();
    const session = db.sessions.find((s) => s.tokenHash === tokenHash);
    if (!session) return null;
    const admin = db.admins.find((a) => a.id === session.adminId);
    if (!admin) return null;
    return { ...session, admin };
  }

  async deleteSessionByTokenHash(tokenHash: string): Promise<void> {
    const db = this.read();
    db.sessions = db.sessions.filter((s) => s.tokenHash !== tokenHash);
    this.write(db);
  }

  async deleteExpiredSessions(): Promise<void> {
    const db = this.read();
    const now = new Date();
    db.sessions = db.sessions.filter((s) => s.expiresAt > now);
    this.write(db);
  }

  async getLatestGoldRate(): Promise<GoldRateRecord | null> {
    const db = this.read();
    if (db.goldRates.length === 0) return null;
    const sorted = [...db.goldRates].sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
    return sorted[0];
  }

  async getGoldRateHistory(limit = 10): Promise<GoldRateRecord[]> {
    const db = this.read();
    return [...db.goldRates]
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, limit);
  }

  async saveGoldRate(data: {
    rate22k: number | string;
    rate24k: number | string;
    note?: string | null;
    updatedById: string;
  }): Promise<GoldRateRecord> {
    const db = this.read();
    const admin = db.admins.find((a) => a.id === data.updatedById);
    const created: GoldRateRecord = {
      id: crypto.randomUUID(),
      rate22k: formatDecimal(data.rate22k),
      rate24k: formatDecimal(data.rate24k),
      currency: "INR",
      note: data.note ?? null,
      updatedAt: new Date(),
      updatedById: data.updatedById,
      updatedByName: admin?.name ?? "Administrator",
    };
    db.goldRates.push(created);
    this.write(db);
    return created;
  }

  async createEnquiry(data: Omit<EnquiryRecord, "id" | "createdAt">): Promise<EnquiryRecord> {
    const db = this.read();
    const created: EnquiryRecord = {
      ...data,
      id: crypto.randomUUID(),
      approxWeightGrams: data.approxWeightGrams
        ? formatDecimal(data.approxWeightGrams)
        : null,
      createdAt: new Date(),
    };
    db.enquiries.push(created);
    this.write(db);
    return created;
  }

  async listEnquiries(limit = 50): Promise<EnquiryRecord[]> {
    const db = this.read();
    return [...db.enquiries]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

let activeStore: DataStore | null = null;

export async function getDataStore(): Promise<DataStore> {
  if (activeStore) return activeStore;

  if (env.databaseUrl && env.nodeEnv !== "test") {
    try {
      const prisma = new PrismaClient();
      await prisma.$connect();
      activeStore = new PrismaDataStore(prisma);
      return activeStore;
    } catch (err) {
      console.warn(
        "[Database] PostgreSQL connection unavailable; using persistent local store fallback (.data/sambhrama-store.json). Configure DATABASE_URL for PostgreSQL."
      );
    }
  }

  activeStore = new FileFallbackDataStore();
  return activeStore;
}

export function setDataStoreForTesting(store: DataStore) {
  activeStore = store;
}
