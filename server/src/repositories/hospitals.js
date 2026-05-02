export async function upsertHospitalFromApplication(db, application, adminUserId) {
  const latitude = parseCoordinate(application.gps_lat, -90, 90);
  const longitude = parseCoordinate(application.gps_lng, -180, 180);

  const result = await db.query(
    `INSERT INTO hospitals (
      name, registration_number, address, city, latitude, longitude,
      phone, email, contact_person_name, contact_person_role, website,
      status, approved_by, approved_at, updated_at
    ) VALUES (
      $1,$2,$3,$4,$5,$6,
      $7,$8,$9,$10,$11,
      'approved',$12,NOW(),NOW()
    )
    ON CONFLICT (email) DO UPDATE SET
      name = EXCLUDED.name,
      registration_number = EXCLUDED.registration_number,
      address = EXCLUDED.address,
      city = EXCLUDED.city,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude,
      phone = EXCLUDED.phone,
      contact_person_name = EXCLUDED.contact_person_name,
      contact_person_role = EXCLUDED.contact_person_role,
      website = EXCLUDED.website,
      status = 'approved',
      approved_by = EXCLUDED.approved_by,
      approved_at = COALESCE(hospitals.approved_at, NOW()),
      updated_at = NOW()
    RETURNING *`,
    [
      application.name_en,
      emptyToNull(application.moph_reg),
      application.address || "Address pending review",
      application.city || "Saida",
      latitude,
      longitude,
      application.phone_main || application.phone_emergency || application.rep_phone || "Pending",
      application.email,
      application.rep_name || application.name_en,
      application.rep_role,
      emptyToNull(application.website),
      adminUserId,
    ]
  );

  return result.rows[0];
}

export async function listHospitals(db) {
  const result = await db.query(
    `SELECT id, name, registration_number, address, city, latitude, longitude,
            phone, email, contact_person_name, contact_person_role, website,
            status, approved_by, approved_at, created_at, updated_at
     FROM hospitals
     ORDER BY created_at DESC`
  );
  return result.rows;
}

export async function findHospitalForUser(db, userId) {
  const result = await db.query(
    `SELECT h.*, hs.staff_role, hs.created_at AS staff_created_at
     FROM hospital_staff hs
     JOIN hospitals h ON h.id = hs.hospital_id
     WHERE hs.user_id = $1
       AND h.status = 'approved'
     ORDER BY hs.created_at ASC
     LIMIT 1`,
    [userId]
  );
  return result.rows[0] || null;
}

function parseCoordinate(value, min, max) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  if (!Number.isFinite(number) || number < min || number > max) return null;
  return number;
}

function emptyToNull(value) {
  return value === "" || value === undefined ? null : value;
}
