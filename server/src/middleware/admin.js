import { pool } from "../db/pool.js";
import { findUserByClerkId } from "../repositories/users.js";

export async function requireAdminRole(req, res, next) {
  try {
    const clerkId = req.auth?.userId;
    if (!clerkId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const user = await findUserByClerkId(pool, clerkId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    req.currentUser = user;
    next();
  } catch (error) {
    next(error);
  }
}
