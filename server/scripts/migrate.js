import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.resolve(__dirname, "..", "migrations");

if (!process.env.POSTGRES_URL) {
  console.error("POSTGRES_URL is required to run migrations.");
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

async function ensureMigrationsTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function getAppliedMigrations(client) {
  const result = await client.query("SELECT filename FROM schema_migrations");
  return new Set(result.rows.map((row) => row.filename));
}

async function runMigration(client, filename) {
  const migrationPath = path.join(migrationsDir, filename);
  const sql = await fs.readFile(migrationPath, "utf8");

  await client.query("BEGIN");
  try {
    await client.query(sql);
    await client.query(
      "INSERT INTO schema_migrations (filename) VALUES ($1)",
      [filename]
    );
    await client.query("COMMIT");
    console.log(`Applied ${filename}`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }
}

async function migrate() {
  const client = await pool.connect();
  try {
    await ensureMigrationsTable(client);
    const applied = await getAppliedMigrations(client);
    const files = (await fs.readdir(migrationsDir))
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of files) {
      if (applied.has(file)) {
        console.log(`Skipping ${file}`);
        continue;
      }
      await runMigration(client, file);
    }

    console.log("Migrations complete.");
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((error) => {
  console.error(error);
  process.exit(1);
});
