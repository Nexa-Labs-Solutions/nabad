export async function findUserByClerkId(db, clerkId) {
  const result = await db.query(
    "SELECT * FROM users WHERE clerk_id = $1",
    [clerkId]
  );
  return result.rows[0] || null;
}

export async function upsertUser(db, { clerkId, email }) {
  const result = await db.query(
    `INSERT INTO users (clerk_id, email)
     VALUES ($1, $2)
     ON CONFLICT (clerk_id) DO UPDATE
       SET email = EXCLUDED.email,
           updated_at = NOW()
     RETURNING *`,
    [clerkId, email || null]
  );
  return result.rows[0];
}
