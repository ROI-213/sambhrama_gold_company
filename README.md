# Sambhrama Gold Company — Production Full-Stack Website

**Tagline:** *"Your Gold. Its True Value. Our Commitment."*

A full-stack, production-oriented business website and administrator portal built for **Sambhrama Gold Company**, covering core Gold Buying, Purity Testing & Valuation services alongside dedicated **Real Estate** and **Loans** venture divisions.

---

## 1. Architecture & Technology Stack

### Frontend (`/client`)
- **Framework:** React 19 + Vite + TypeScript
- **Styling:** Tailwind CSS v4 with custom luxury Indian gold brand palette (`#101010` Deep Black, `#202020` Charcoal, `#C9A24D` Metallic Gold, `#D4AF37` Rich Gold, `#F4E6C3` Champagne, `#FAF7F0` Warm Cream, `#FFFFFF` White)
- **Typography:** `Playfair Display` (headings) + `Inter` (body)
- **Routing:** React Router v7
- **Animations:** Framer Motion (with `prefers-reduced-motion` accessibility compliance)
- **Forms & Validation:** React Hook Form + Zod
- **Icons:** Lucide React

### Backend (`/server`)
- **Runtime & Server:** Node.js + Express.js + TypeScript
- **Database & ORM:** PostgreSQL + Prisma ORM (`Decimal(12,2)` precision for monetary gold rates, `Asia/Kolkata` IST timezone formatting, plus automatic local JSON fallback store when PostgreSQL is not running in local preview environments)
- **Authentication & Security:**
  - `bcryptjs` (cost factor 12) password hashing
  - Server-persisted `AdminSession` records with `HttpOnly`, `SameSite=Lax` cookies
  - Synchronizer `X-CSRF-Token` validation on state-mutating admin endpoints
  - `helmet` HTTP security headers & controlled `cors`
  - `express-rate-limit` on administrator login, enquiry submissions, and public endpoints
  - Honeypot anti-spam protection and server-side Zod validation on all 5 enquiry forms
  - Optional `nodemailer` SMTP email notifications for new enquiries

---

## 2. Project Directory Structure

```text
sambhrama gold company/
├── package.json
├── .env.example
├── README.md
├── client/
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.ts
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── admin/
│       │   ├── AdminAuthContext.tsx
│       │   ├── AdminLayout.tsx
│       │   ├── AdminLoginPage.tsx
│       │   ├── AdminDashboardPage.tsx
│       │   └── AdminGoldRatesPage.tsx
│       ├── components/
│       │   ├── CertificateGallery.tsx
│       │   ├── ContactActions.tsx
│       │   ├── EnquiryForm.tsx
│       │   ├── FAQAndTestimonial.tsx
│       │   ├── Footer.tsx
│       │   ├── GoldRateDisplay.tsx
│       │   ├── Header.tsx
│       │   ├── HeroBanner.tsx
│       │   ├── PrimaryButton.tsx
│       │   ├── SectionHeading.tsx
│       │   ├── ServiceAndVentureCards.tsx
│       │   └── StatusStates.tsx
│       ├── config/
│       │   └── companyConfig.ts
│       ├── data/
│       │   └── siteContent.ts
│       ├── hooks/
│       │   ├── useGoldRates.tsx
│       │   └── usePageMeta.ts
│       ├── pages/
│       │   ├── HomePage.tsx
│       │   ├── AboutPage.tsx
│       │   ├── SellYourGoldPage.tsx
│       │   ├── CertificatesPage.tsx
│       │   ├── TestimonialsPage.tsx
│       │   ├── VenturesOverviewPage.tsx
│       │   ├── RealEstateVenturePage.tsx
│       │   ├── LoansVenturePage.tsx
│       │   ├── GoldVenturePage.tsx
│       │   ├── ContactPage.tsx
│       │   └── LegalAndNotFoundPages.tsx
│       ├── services/
│       │   └── api.ts
│       └── __tests__/
│           └── app.test.tsx
└── server/
    ├── .env.example
    ├── package.json
    ├── tsconfig.json
    ├── prisma/
    │   ├── schema.prisma
    │   └── migrations/
    │       ├── migration_lock.toml
    │       └── 20261016000000_init/
    │           └── migration.sql
    └── src/
        ├── index.ts
        ├── app.ts
        ├── config/
        │   └── env.ts
        ├── controllers/
        │   ├── adminController.ts
        │   ├── enquiryController.ts
        │   └── goldRateController.ts
        ├── middleware/
        │   ├── auth.ts
        │   └── rateLimiters.ts
        ├── routes/
        │   ├── adminRoutes.ts
        │   ├── enquiryRoutes.ts
        │   └── goldRateRoutes.ts
        ├── scripts/
        │   └── seedAdmin.ts
        ├── services/
        │   ├── db.ts
        │   └── email.ts
        ├── validators/
        │   └── schemas.ts
        └── __tests__/
            └── api.test.ts
```

---

## 3. Installation & Setup Commands

### Step 1: Install Dependencies
From the root directory:
```bash
npm --prefix server install
npm --prefix client install
```

### Step 2: Configure Environment Variables
Copy the example environment files and populate your local values:
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### Step 3: Run PostgreSQL Database Migrations
Ensure your PostgreSQL database is running and `DATABASE_URL` is set in `server/.env`, then run:
```bash
npm --prefix server run prisma:generate
npm --prefix server run prisma:migrate
```
*(Note: For development/testing on machines where a local PostgreSQL service is not active, `server/src/services/db.ts` automatically falls back to a persistent file store in `server/.data/sambhrama-store.json` so all API endpoints, admin logins, gold rate updates, and enquiry forms work immediately.)*

---

## 4. First-Administrator Setup Instructions

Credentials are **never** hardcoded in the source code. To create or update the administrator account:

1. Open `server/.env` and set:
   ```env
   ADMIN_INITIAL_EMAIL="admin@sambhramagold.com"
   ADMIN_INITIAL_NAME="Sambhrama Administrator"
   ADMIN_INITIAL_PASSWORD="YourStrongPasswordHere123!"
   ```
2. Run the seed script:
   ```bash
   npm --prefix server run seed:admin
   ```
3. Clear `ADMIN_INITIAL_PASSWORD` from `server/.env` after seeding if desired.

---

## 5. How to Update 22K & 24K Gold Rates Manually

1. Start both backend and frontend servers:
   ```bash
   # Terminal 1 (Backend API on port 4000)
   npm run dev:server

   # Terminal 2 (Frontend Vite app on port 5173)
   npm run dev:client
   ```
2. Navigate to `http://localhost:5173/admin/login` and sign in with your administrator email and password.
3. Click **Gold Rate Management** (`/admin/gold-rates`).
4. Enter positive INR-per-gram values for **22K Gold Rate** and **24K Gold Rate** (plus an optional note).
5. Click **Save & Publish Gold Rates**.
6. The rates are stored in PostgreSQL with `Decimal(12,2)` precision and an `Asia/Kolkata` (IST) timestamp, and are immediately displayed on:
   - The global sticky header (`GoldRateBar`)
   - The Home page (`GoldRateCard`)
   - The Sell Your Gold page (`GoldRateCard`)
   - The Gold Venture page (`/ventures/gold`)

---

## 6. Running Builds & Automated Tests

```bash
# Build both server and client for production
npm run build

# Run backend and frontend automated test suites
npm run test
```

---

## 7. Pre-Launch Checklist: Verified Business Information to Supply Before Going Live

In accordance with strict authenticity and compliance standards, no fictional phone numbers, fake addresses, fake certificates, or fabricated customer reviews have been hardcoded. Before deploying to production, supply the following verified details:

1. **Company Contact & Location (`client/.env`):**
   - `VITE_COMPANY_PHONE` — Verified office phone number(s)
   - `VITE_COMPANY_WHATSAPP` — Verified WhatsApp business number (with country code, e.g., `9198XXXXXXXX`)
   - `VITE_COMPANY_EMAIL` — Official customer support email address
   - `VITE_COMPANY_ADDRESS` — Full registered/branch office address
   - `VITE_COMPANY_HOURS` — Verified working days and business hours
   - `VITE_COMPANY_MAPS_URL` — Direct Google Maps directions link
   - `VITE_COMPANY_MAPS_EMBED_URL` — Google Maps iframe embed URL
   - `VITE_GOOGLE_BUSINESS_REVIEW_URL` — Official Google Business Profile review link
   - `VITE_SOCIAL_FACEBOOK`, `VITE_SOCIAL_INSTAGRAM`, `VITE_SOCIAL_YOUTUBE`, `VITE_SOCIAL_LINKEDIN` — Verified social links

2. **Verified Certificates (`client/src/data/siteContent.ts` -> `verifiedCertificates`):**
   - Upload verified PDF/image scans of Company Registrations, Applicable Business Licenses, Professional Certifications, and Awards/Recognitions to `client/public/certificates/` and add their entries with `verified: true`.

3. **Approved Customer Testimonials (`client/src/data/siteContent.ts` -> `approvedTestimonials`):**
   - Add genuine, customer-consented testimonials with `approved: true`.

4. **Verified Real Estate Portfolio (`client/src/data/siteContent.ts` -> `verifiedRealEstateProjects`):**
   - Add verified residential/commercial projects with `verified: true`.

5. **Production Server Environment (`server/.env`):**
   - Production PostgreSQL `DATABASE_URL`
   - `NODE_ENV=production` and `COOKIE_SECURE=true` (behind HTTPS reverse proxy such as Nginx, Cloudflare, or Render/Railway/AWS)
   - `CLIENT_ORIGIN=https://yourdomain.com`
   - Optional SMTP settings (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `ENQUIRY_NOTIFICATION_TO`) for instant email alerts on new enquiries.
