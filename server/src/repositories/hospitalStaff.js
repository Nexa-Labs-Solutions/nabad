export async function findHospitalStaffByUserId(db, userId) {
  const result = await db.query(
    "SELECT * FROM hospital_staff WHERE user_id = $1 ORDER BY created_at ASC",
    [userId]
  );
  return result.rows;
}
