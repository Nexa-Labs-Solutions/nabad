export function requireAuthenticated(req, res, next) {
  if (!req.auth?.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }

  next();
}
