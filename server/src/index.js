import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    clerk_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    role VARCHAR(50) DEFAULT 'donor',
    created_at TIMESTAMPTZ DEFAULT NOW()
  )
`);

await pool.query(`
  CREATE TABLE IF NOT EXISTS hospital_applications (
    id SERIAL PRIMARY KEY,
    ref_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    name_ar TEXT, name_en TEXT NOT NULL, hospital_type VARCHAR(100),
    moph_reg VARCHAR(100), year_established INTEGER, bed_count INTEGER, description TEXT,
    governorate VARCHAR(100), city VARCHAR(100), address TEXT,
    gps_lat VARCHAR(50), gps_lng VARCHAR(50),
    phone_main VARCHAR(50), phone_emergency VARCHAR(50),
    email VARCHAR(255) NOT NULL, website VARCHAR(255),
    has_blood_bank BOOLEAN, er_status VARCHAR(50),
    blood_types_needed TEXT[], monthly_units INTEGER, icu_beds INTEGER, blood_notes TEXT,
    rep_name TEXT, rep_role VARCHAR(100), rep_national_id VARCHAR(100),
    rep_phone VARCHAR(50), rep_email VARCHAR(255), rep_whatsapp VARCHAR(50),
    clerk_id VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )
`);

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:3000"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/hello", requireAuth(), (req, res) => {
  res.json({ message: "Hello from the backend!", userId: req.auth.userId });
});

app.post("/save-user", requireAuth(), async (req, res) => {
  const { userId } = req.auth;
  const { email } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (clerk_id, email)
       VALUES ($1, $2)
       ON CONFLICT (clerk_id) DO UPDATE SET email = EXCLUDED.email
       RETURNING *`,
      [userId, email || null]
    );
    res.json({ message: "User saved!", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Submit hospital registration (public — no Clerk account yet)
app.post("/hospital-applications", async (req, res) => {
  const {
    refNumber, nameAr, nameEn, hospitalType, mophReg, yearEst, bedCount, description,
    governorate, city, address, gpsLat, gpsLng, phoneMain, phoneEmergency, email, website,
    hasBloodBank, erStatus, bloodTypes, monthlyUnits, icuBeds, bloodNotes,
    repName, repRole, repNationalId, repPhone, repEmail, repWhatsapp,
  } = req.body;

  if (!nameEn || !email || !refNumber) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO hospital_applications (
        ref_number, name_ar, name_en, hospital_type, moph_reg,
        year_established, bed_count, description,
        governorate, city, address, gps_lat, gps_lng,
        phone_main, phone_emergency, email, website,
        has_blood_bank, er_status, blood_types_needed,
        monthly_units, icu_beds, blood_notes,
        rep_name, rep_role, rep_national_id, rep_phone, rep_email, rep_whatsapp
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,
        $9,$10,$11,$12,$13,$14,$15,$16,$17,
        $18,$19,$20,$21,$22,$23,
        $24,$25,$26,$27,$28,$29
      ) RETURNING id, ref_number, status, created_at`,
      [
        refNumber, nameAr, nameEn, hospitalType, mophReg,
        yearEst ? parseInt(yearEst) : null,
        bedCount ? parseInt(bedCount) : null,
        description,
        governorate, city, address, gpsLat, gpsLng,
        phoneMain, phoneEmergency, email, website,
        hasBloodBank === "yes",
        erStatus,
        bloodTypes,
        monthlyUnits ? parseInt(monthlyUnits) : null,
        icuBeds ? parseInt(icuBeds) : null,
        bloodNotes,
        repName, repRole, repNationalId, repPhone, repEmail, repWhatsapp,
      ]
    );
    res.status(201).json({ application: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// List all applications — admin only
app.get("/hospital-applications", requireAuth(), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, ref_number, name_en, email, governorate, city, status, created_at
       FROM hospital_applications ORDER BY created_at DESC`
    );
    res.json({ applications: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Approve or reject an application — admin only
app.patch("/hospital-applications/:id/status", requireAuth(), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Status must be 'approved' or 'rejected'" });
  }
  try {
    const result = await pool.query(
      `UPDATE hospital_applications SET status = $1, updated_at = NOW()
       WHERE id = $2 RETURNING *`,
      [status, id]
    );
    if (!result.rows.length) return res.status(404).json({ error: "Not found" });
    res.json({ application: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
