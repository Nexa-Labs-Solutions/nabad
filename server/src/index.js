import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { pool, withTransaction } from "./db/pool.js";
import { requireAdminRole } from "./middleware/admin.js";
import { requireAuthenticated } from "./middleware/auth.js";
import { createAdminLog } from "./repositories/adminLogs.js";
import {
  createHospitalApplication,
  findHospitalApplicationById,
  listHospitalApplications,
  updateHospitalApplicationStatus,
} from "./repositories/hospitalApplications.js";
import {
  findHospitalForUser,
  listHospitals,
  upsertHospitalFromApplication,
} from "./repositories/hospitals.js";
import { findUserByClerkId, upsertUser } from "./repositories/users.js";

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

app.get("/hello", requireAuthenticated, (req, res) => {
  res.json({ message: "Hello from the backend!", userId: req.auth.userId });
});

app.post("/save-user", requireAuthenticated, async (req, res) => {
  try {
    const user = await upsertUser(pool, {
      clerkId: req.auth.userId,
      email: req.body.email,
    });
    res.json({ message: "User saved!", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/hospital-applications", async (req, res) => {
  const { nameEn, email, refNumber } = req.body;
  if (!nameEn || !email || !refNumber) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const application = await createHospitalApplication(pool, req.body);
    res.status(201).json({ application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/hospital-applications", requireAuthenticated, requireAdminRole, async (req, res) => {
  try {
    const applications = await listHospitalApplications(pool);
    res.json({ applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.patch("/hospital-applications/:id/status", requireAuthenticated, requireAdminRole, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Status must be 'approved' or 'rejected'" });
  }

  try {
    const result = await withTransaction(async (client) => {
      const existingApplication = await findHospitalApplicationById(client, id);
      if (!existingApplication) return null;

      const application = await updateHospitalApplicationStatus(client, id, status);
      let hospital = null;

      if (status === "approved") {
        hospital = await upsertHospitalFromApplication(client, application, req.currentUser.id);
      }

      await createAdminLog(client, {
        adminUserId: req.currentUser.id,
        action: status === "approved"
          ? "hospital_application_approved"
          : "hospital_application_rejected",
        targetType: "hospital_application",
        targetId: application.id,
        notes: hospital ? `Canonical hospital ${hospital.id}` : null,
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });

      return { application, hospital };
    });

    if (!result) return res.status(404).json({ error: "Not found" });
    res.json(result);
  } catch (err) {
    console.error(err);
    if (err.code === "23505") {
      return res.status(409).json({ error: "Hospital approval conflicts with an existing hospital" });
    }
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/hospitals/me", requireAuthenticated, async (req, res) => {
  try {
    const user = await findUserByClerkId(pool, req.auth.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const hospital = await findHospitalForUser(pool, user.id);
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });

    res.json({ hospital });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/admin/hospitals", requireAuthenticated, requireAdminRole, async (req, res) => {
  try {
    const hospitals = await listHospitals(pool);
    res.json({ hospitals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
