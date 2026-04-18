import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

// Create users table if it doesn't exist
await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    clerk_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
  )
`);

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((o) => o.trim())
  : [];
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
