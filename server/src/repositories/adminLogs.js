export async function createAdminLog(db, {
  adminUserId,
  action,
  targetType,
  targetId,
  notes,
  ipAddress,
  userAgent,
}) {
  const result = await db.query(
    `INSERT INTO admin_logs (
      admin_user_id, action, target_type, target_id, notes, ip_address, user_agent
    ) VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *`,
    [
      adminUserId,
      action,
      targetType,
      String(targetId),
      notes || null,
      normalizeIp(ipAddress),
      userAgent || null,
    ]
  );
  return result.rows[0];
}

function normalizeIp(ipAddress) {
  if (!ipAddress) return null;
  const first = String(ipAddress).split(",")[0].trim();
  if (first === "::1") return "127.0.0.1";
  if (first.startsWith("::ffff:")) return first.slice(7);
  return first;
}
