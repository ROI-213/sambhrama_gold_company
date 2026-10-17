import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || "development",
  clientOrigins: (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
  databaseUrl: process.env.DATABASE_URL || "",
  sessionCookieName: process.env.SESSION_COOKIE_NAME || "sambhrama_admin_session",
  sessionTtlHours: Number(process.env.SESSION_TTL_HOURS || 12),
  cookieSecure:
    process.env.COOKIE_SECURE === "true" || process.env.NODE_ENV === "production",
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.SMTP_FROM || "Sambhrama Gold Company <sowmyats209@gmail.com>",
    notificationTo: process.env.ENQUIRY_NOTIFICATION_TO || "sowmyats209@gmail.com",
  },
};
