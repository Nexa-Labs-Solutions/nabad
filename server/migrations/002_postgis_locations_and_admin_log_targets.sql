DROP INDEX IF EXISTS idx_donor_location_gist;
DROP INDEX IF EXISTS idx_hospital_location_gist;

CREATE INDEX IF NOT EXISTS idx_donor_location
  ON donor_profiles (latitude, longitude);

CREATE INDEX IF NOT EXISTS idx_hospital_location
  ON hospitals (latitude, longitude);

ALTER TABLE admin_logs
  ALTER COLUMN target_id TYPE TEXT USING target_id::TEXT;
