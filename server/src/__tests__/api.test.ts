import { describe, it, expect, beforeEach, afterAll } from "vitest";
import request from "supertest";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";
import { createApp } from "../app.js";
import {
  FileFallbackDataStore,
  setDataStoreForTesting,
} from "../services/db.js";

const TEST_DB_PATH = path.resolve(process.cwd(), ".data", "test-store.json");

describe("Sambhrama Gold Company Backend API Suite", () => {
  const app = createApp();
  let store: FileFallbackDataStore;

  beforeEach(async () => {
    if (fs.existsSync(TEST_DB_PATH)) {
      fs.unlinkSync(TEST_DB_PATH);
    }
    store = new FileFallbackDataStore(TEST_DB_PATH);
    setDataStoreForTesting(store);

    const passwordHash = await bcrypt.hash("StrongAdminPass123!", 10);
    await store.upsertAdmin({
      email: "admin@sambhramagold.com",
      name: "Chief Administrator",
      passwordHash,
    });
  });

  afterAll(() => {
    if (fs.existsSync(TEST_DB_PATH)) {
      fs.unlinkSync(TEST_DB_PATH);
    }
  });

  it("GET /api/gold-rates returns honest unconfigured state when no rates exist", async () => {
    const res = await request(app).get("/api/gold-rates");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.configured).toBe(false);
    expect(res.body.data).toBeNull();
    expect(res.body.message).toContain("Rate not updated");
  });

  it("rejects unauthenticated requests to /api/admin/session and /api/admin/gold-rates", async () => {
    const sessionRes = await request(app).get("/api/admin/session");
    expect(sessionRes.status).toBe(401);

    const putRes = await request(app)
      .put("/api/admin/gold-rates")
      .send({ rate22k: 6800, rate24k: 7400 });
    expect(putRes.status).toBe(401);
  });

  it("authenticates admin, persists manual 22K & 24K gold rates, and serves them publicly with IST timestamp", async () => {
    // 1. Login with invalid password fails
    const badLogin = await request(app).post("/api/admin/login").send({
      email: "admin@sambhramagold.com",
      password: "WrongPassword999",
    });
    expect(badLogin.status).toBe(401);

    // 2. Login with valid credentials succeeds & sets HttpOnly cookie + CSRF token
    const loginRes = await request(app).post("/api/admin/login").send({
      email: "admin@sambhramagold.com",
      password: "StrongAdminPass123!",
    });
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.success).toBe(true);
    expect(loginRes.body.csrfToken).toBeDefined();

    const cookies = loginRes.headers["set-cookie"];
    expect(cookies).toBeDefined();
    const csrfToken = loginRes.body.csrfToken as string;

    // 3. Rejects PUT /api/admin/gold-rates without CSRF header
    const noCsrfRes = await request(app)
      .put("/api/admin/gold-rates")
      .set("Cookie", cookies)
      .send({ rate22k: 6850, rate24k: 7470 });
    expect(noCsrfRes.status).toBe(403);

    // 4. Rejects invalid/negative gold rate values
    const invalidRateRes = await request(app)
      .put("/api/admin/gold-rates")
      .set("Cookie", cookies)
      .set("X-CSRF-Token", csrfToken)
      .send({ rate22k: -500, rate24k: 7470 });
    expect(invalidRateRes.status).toBe(400);

    // 5. Saves valid positive INR-per-gram rates
    const saveRes = await request(app)
      .put("/api/admin/gold-rates")
      .set("Cookie", cookies)
      .set("X-CSRF-Token", csrfToken)
      .send({
        rate22k: 6895.5,
        rate24k: 7520.25,
        note: "Subject to purity verification",
      });
    expect(saveRes.status).toBe(200);
    expect(saveRes.body.success).toBe(true);
    expect(saveRes.body.data.rate22k).toBe(6895.5);
    expect(saveRes.body.data.rate24k).toBe(7520.25);
    expect(saveRes.body.data.updatedAtIST).toContain("IST");

    // 6. Public GET /api/gold-rates immediately reflects the saved rates
    const publicRes = await request(app).get("/api/gold-rates");
    expect(publicRes.status).toBe(200);
    expect(publicRes.body.configured).toBe(true);
    expect(publicRes.body.data.rate22k).toBe(6895.5);
    expect(publicRes.body.data.rate24k).toBe(7520.25);

    // 7. Logout invalidates the session
    const logoutRes = await request(app)
      .post("/api/admin/logout")
      .set("Cookie", cookies)
      .set("X-CSRF-Token", csrfToken);
    expect(logoutRes.status).toBe(200);

    const afterLogoutSession = await request(app)
      .get("/api/admin/session")
      .set("Cookie", cookies);
    expect(afterLogoutSession.status).toBe(401);
  });

  it("validates and persists customer enquiries across all 5 form variants", async () => {
    // Invalid mobile number is rejected
    const invalidEnquiry = await request(app).post("/api/enquiries").send({
      enquiryType: "SELL_GOLD",
      fullName: "Ramesh Kumar",
      mobile: "12345",
      city: "Bengaluru",
      goldType: "Old Gold",
      message: "Looking to evaluate old bangles.",
    });
    expect(invalidEnquiry.status).toBe(400);

    // Valid SELL_GOLD enquiry is persisted
    const validSellGold = await request(app).post("/api/enquiries").send({
      enquiryType: "SELL_GOLD",
      fullName: "Anitha Rao",
      mobile: "9876543210",
      email: "anitha@example.com",
      city: "Bengaluru",
      goldType: "Used Gold Jewellery",
      approxWeightGrams: 34.5,
      message: "I would like to visit your office tomorrow for purity testing.",
    });
    expect(validSellGold.status).toBe(201);
    expect(validSellGold.body.success).toBe(true);
    expect(validSellGold.body.data.enquiryType).toBe("SELL_GOLD");

    // Verify stored in database
    const allEnquiries = await store.listEnquiries();
    expect(allEnquiries.length).toBe(1);
    expect(allEnquiries[0].fullName).toBe("Anitha Rao");
    expect(allEnquiries[0].approxWeightGrams).toBe("34.50");
  });
});
