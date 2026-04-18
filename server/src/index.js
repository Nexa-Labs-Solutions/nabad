import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/hello", requireAuth(), (req, res) => {
  res.json({ message: "Hello from the backend!", userId: req.auth.userId });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
