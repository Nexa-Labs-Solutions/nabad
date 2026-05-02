export async function createHospitalApplication(db, payload) {
  const {
    refNumber, nameAr, nameEn, hospitalType, mophReg, yearEst, bedCount, description,
    governorate, city, address, gpsLat, gpsLng, phoneMain, phoneEmergency, email, website,
    hasBloodBank, erStatus, bloodTypes, monthlyUnits, icuBeds, bloodNotes,
    repName, repRole, repNationalId, repPhone, repEmail, repWhatsapp,
  } = payload;

  const result = await db.query(
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
      refNumber, nameAr, nameEn, hospitalType, emptyToNull(mophReg),
      yearEst ? parseInt(yearEst, 10) : null,
      bedCount ? parseInt(bedCount, 10) : null,
      description,
      governorate, city, address, gpsLat, gpsLng,
      phoneMain, phoneEmergency, email, website,
      hasBloodBank === "yes",
      erStatus,
      bloodTypes,
      monthlyUnits ? parseInt(monthlyUnits, 10) : null,
      icuBeds ? parseInt(icuBeds, 10) : null,
      bloodNotes,
      repName, repRole, repNationalId, repPhone, repEmail, repWhatsapp,
    ]
  );
  return result.rows[0];
}

export async function listHospitalApplications(db) {
  const result = await db.query(
    `SELECT *
     FROM hospital_applications
     ORDER BY created_at DESC`
  );
  return result.rows;
}

export async function findHospitalApplicationById(db, id) {
  const result = await db.query(
    "SELECT * FROM hospital_applications WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
}

export async function updateHospitalApplicationStatus(db, id, status) {
  const result = await db.query(
    `UPDATE hospital_applications
     SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );
  return result.rows[0] || null;
}

function emptyToNull(value) {
  return value === "" || value === undefined ? null : value;
}
