CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  clerk_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  role VARCHAR(50) DEFAULT 'donor',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS full_name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

CREATE TABLE IF NOT EXISTS hospital_applications (
  id SERIAL PRIMARY KEY,
  ref_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  name_ar TEXT,
  name_en TEXT NOT NULL,
  hospital_type VARCHAR(100),
  moph_reg VARCHAR(100),
  year_established INTEGER,
  bed_count INTEGER,
  description TEXT,
  governorate VARCHAR(100),
  city VARCHAR(100),
  address TEXT,
  gps_lat VARCHAR(50),
  gps_lng VARCHAR(50),
  phone_main VARCHAR(50),
  phone_emergency VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  website VARCHAR(255),
  has_blood_bank BOOLEAN,
  er_status VARCHAR(50),
  blood_types_needed TEXT[],
  monthly_units INTEGER,
  icu_beds INTEGER,
  blood_notes TEXT,
  rep_name TEXT,
  rep_role VARCHAR(100),
  rep_national_id VARCHAR(100),
  rep_phone VARCHAR(50),
  rep_email VARCHAR(255),
  rep_whatsapp VARCHAR(50),
  clerk_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blood_compatibility (
  donor_type VARCHAR(5) NOT NULL,
  recipient_type VARCHAR(5) NOT NULL,
  PRIMARY KEY (donor_type, recipient_type)
);

INSERT INTO blood_compatibility (donor_type, recipient_type) VALUES
  ('O-', 'O-'), ('O-', 'O+'), ('O-', 'A-'), ('O-', 'A+'), ('O-', 'B-'), ('O-', 'B+'), ('O-', 'AB-'), ('O-', 'AB+'),
  ('O+', 'O+'), ('O+', 'A+'), ('O+', 'B+'), ('O+', 'AB+'),
  ('A-', 'A-'), ('A-', 'A+'), ('A-', 'AB-'), ('A-', 'AB+'),
  ('A+', 'A+'), ('A+', 'AB+'),
  ('B-', 'B-'), ('B-', 'B+'), ('B-', 'AB-'), ('B-', 'AB+'),
  ('B+', 'B+'), ('B+', 'AB+'),
  ('AB-', 'AB-'), ('AB-', 'AB+'),
  ('AB+', 'AB+')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS donor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth DATE NOT NULL,
  biological_sex VARCHAR(10) CHECK (biological_sex IN ('male', 'female')),
  weight_kg DECIMAL(5,1) NOT NULL CHECK (weight_kg >= 50),
  blood_type VARCHAR(5) CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  blood_type_confirmed BOOLEAN DEFAULT FALSE,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  notification_sms BOOLEAN DEFAULT TRUE,
  notification_push BOOLEAN DEFAULT FALSE,
  notification_hours VARCHAR(20) DEFAULT 'anytime',
  eligibility_status VARCHAR(20) DEFAULT 'under_review'
    CHECK (eligibility_status IN ('eligible', 'under_review', 'ineligible', 'suspended')),
  no_show_count INTEGER DEFAULT 0,
  total_donations INTEGER DEFAULT 0,
  reliability_score INTEGER DEFAULT 100 CHECK (reliability_score BETWEEN 0 AND 130),
  last_donation_at TIMESTAMPTZ,
  last_notified_at TIMESTAMPTZ,
  notification_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS initial_screenings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID NOT NULL UNIQUE REFERENCES donor_profiles(id),
  donated_last_3_months BOOLEAN NOT NULL,
  had_surgery_6_months BOOLEAN NOT NULL,
  had_tattoo_6_months BOOLEAN NOT NULL,
  has_active_illness BOOLEAN NOT NULL,
  is_pregnant_breastfeeding BOOLEAN NOT NULL,
  on_prescription_meds BOOLEAN NOT NULL,
  has_hiv_hepatitis BOOLEAN NOT NULL,
  has_heart_condition BOOLEAN NOT NULL,
  result VARCHAR(20) DEFAULT 'under_review'
    CHECK (result IN ('eligible', 'under_review', 'ineligible')),
  reviewed_by INTEGER REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  registration_number VARCHAR(100) UNIQUE,
  address TEXT NOT NULL,
  city VARCHAR(100) DEFAULT 'Saida',
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  contact_person_name VARCHAR(255) NOT NULL,
  contact_person_role VARCHAR(100),
  website VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  approved_by INTEGER REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hospital_staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
  staff_role VARCHAR(50) DEFAULT 'coordinator'
    CHECK (staff_role IN ('manager', 'coordinator', 'staff')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, hospital_id)
);

CREATE TABLE IF NOT EXISTS blood_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key VARCHAR(255) UNIQUE,
  hospital_id UUID NOT NULL REFERENCES hospitals(id),
  created_by INTEGER NOT NULL REFERENCES users(id),
  blood_type VARCHAR(5) NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_needed INTEGER NOT NULL CHECK (units_needed > 0),
  units_fulfilled INTEGER DEFAULT 0 CHECK (units_fulfilled >= 0),
  urgency_level VARCHAR(20) NOT NULL CHECK (urgency_level IN ('critical', 'urgent', 'normal')),
  current_radius_km DECIMAL(6,2) NOT NULL DEFAULT 5.0,
  priority_score DECIMAL(8,2) DEFAULT 0,
  status VARCHAR(25) DEFAULT 'active'
    CHECK (status IN ('active', 'partially_fulfilled', 'fulfilled', 'expired', 'cancelled')),
  notes TEXT,
  triggered_by_qr UUID,
  expires_at TIMESTAMPTZ NOT NULL,
  fulfilled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (units_fulfilled <= units_needed)
);

CREATE TABLE IF NOT EXISTS qr_coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID NOT NULL REFERENCES hospitals(id),
  generated_by INTEGER NOT NULL REFERENCES users(id),
  blood_type VARCHAR(5) CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_needed INTEGER NOT NULL CHECK (units_needed > 0),
  urgency_level VARCHAR(20) CHECK (urgency_level IN ('critical', 'urgent', 'normal')),
  qr_token VARCHAR(255) UNIQUE NOT NULL,
  patient_identifier VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active'
    CHECK (status IN ('active', 'redeemed', 'expired')),
  expires_at TIMESTAMPTZ NOT NULL,
  redeemed_at TIMESTAMPTZ,
  request_id UUID UNIQUE REFERENCES blood_requests(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_blood_requests_triggered_by_qr'
  ) THEN
    ALTER TABLE blood_requests
      ADD CONSTRAINT fk_blood_requests_triggered_by_qr
      FOREIGN KEY (triggered_by_qr) REFERENCES qr_coupons(id);
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS request_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES blood_requests(id) ON DELETE CASCADE,
  donor_id UUID NOT NULL REFERENCES donor_profiles(id),
  distance_km DECIMAL(8,3) NOT NULL,
  reliability_score INTEGER NOT NULL,
  notification_method VARCHAR(10) CHECK (notification_method IN ('sms', 'push', 'both')),
  status VARCHAR(30) DEFAULT 'notified'
    CHECK (status IN (
      'notified', 'screening_started', 'screening_passed', 'screening_failed',
      'confirmed', 'declined', 'no_show', 'donated', 'cancelled'
    )),
  notified_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  donated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (request_id, donor_id)
);

CREATE TABLE IF NOT EXISTS daily_screenings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL UNIQUE REFERENCES request_matches(id),
  feeling_well BOOLEAN NOT NULL,
  has_fever_today BOOLEAN NOT NULL,
  ate_in_last_4h BOOLEAN NOT NULL,
  on_new_meds BOOLEAN NOT NULL,
  result VARCHAR(20) CHECK (result IN ('eligible', 'ineligible')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES request_matches(id),
  channel VARCHAR(10) NOT NULL CHECK (channel IN ('sms', 'push')),
  message_body TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'sent'
    CHECK (status IN ('sent', 'delivered', 'failed', 'bounced')),
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  delivered_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id INTEGER NOT NULL REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50) NOT NULL,
  target_id UUID NOT NULL,
  notes TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_donor_location ON donor_profiles (latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_hospital_location ON hospitals (latitude, longitude);

CREATE INDEX IF NOT EXISTS idx_donor_match
  ON donor_profiles (blood_type, reliability_score DESC)
  WHERE eligibility_status = 'eligible' AND is_active = TRUE;

CREATE INDEX IF NOT EXISTS idx_active_requests_urgency
  ON blood_requests (urgency_level, priority_score DESC, created_at)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_requests_expiry
  ON blood_requests (expires_at)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_matches_request_status ON request_matches (request_id, status);
CREATE INDEX IF NOT EXISTS idx_matches_donor_status ON request_matches (donor_id, status);
CREATE INDEX IF NOT EXISTS idx_hospitals_pending ON hospitals (created_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_qr_token ON qr_coupons (qr_token);
CREATE INDEX IF NOT EXISTS idx_qr_active ON qr_coupons (expires_at) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_notif_match ON notifications (match_id);
CREATE INDEX IF NOT EXISTS idx_request_idemp ON blood_requests (idempotency_key) WHERE idempotency_key IS NOT NULL;
