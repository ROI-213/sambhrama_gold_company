import bcrypt from "bcryptjs";
import { getDataStore } from "../services/db.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * First-Administrator Setup Script
 * Usage:
 *   Set ADMIN_INITIAL_EMAIL, ADMIN_INITIAL_PASSWORD, and optionally ADMIN_INITIAL_NAME
 *   in server/.env (or pass as environment variables), then run:
 *   npm --prefix server run seed:admin
 */
async function seedFirstAdmin() {
  const email = process.env.ADMIN_INITIAL_EMAIL?.trim();
  const password = process.env.ADMIN_INITIAL_PASSWORD;
  const name = process.env.ADMIN_INITIAL_NAME?.trim() || "Sambhrama Administrator";

  if (!email || !password) {
    console.error(
      "Error: ADMIN_INITIAL_EMAIL and ADMIN_INITIAL_PASSWORD must be set in your environment or server/.env file before running seed:admin."
    );
    console.error(
      "Example: ADMIN_INITIAL_EMAIL=admin@sambhramagold.com ADMIN_INITIAL_PASSWORD=YourStrongPassword123! npm run seed:admin"
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Error: ADMIN_INITIAL_PASSWORD must be at least 8 characters long.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const store = await getDataStore();

  const admin = await store.upsertAdmin({
    email,
    name,
    passwordHash,
  });

  console.log("====================================================");
  console.log("Administrator account configured successfully:");
  console.log(`  ID:    ${admin.id}`);
  console.log(`  Email: ${admin.email}`);
  console.log(`  Name:  ${admin.name}`);
  console.log("====================================================");
}

seedFirstAdmin().catch((err) => {
  console.error("Failed to seed administrator:", err);
  process.exit(1);
});
