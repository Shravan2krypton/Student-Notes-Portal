import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const sql = neon(connectionString);

const TABLE_SQL = [
  `CREATE TABLE IF NOT EXISTS "departments" (
    "id" serial PRIMARY KEY NOT NULL,
    "slug" varchar(64) NOT NULL UNIQUE,
    "name" varchar(256) NOT NULL,
    "description" text,
    "accent_color" varchar(32)
  )`,
  `CREATE TABLE IF NOT EXISTS "resources" (
    "id" serial PRIMARY KEY NOT NULL,
    "department_id" integer NOT NULL REFERENCES "departments"("id") ON DELETE CASCADE,
    "semester" integer NOT NULL,
    "type" varchar(32) NOT NULL,
    "url" text,
    "label" varchar(256)
  )`,
  `CREATE TABLE IF NOT EXISTS "feedback" (
    "id" serial PRIMARY KEY NOT NULL,
    "message" text NOT NULL,
    "contact" varchar(256),
    "created_at" timestamp DEFAULT now() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS "config" (
    "key" varchar(64) PRIMARY KEY NOT NULL,
    "value" text
  )`,
];

async function main() {
  console.log("Creating tables...");
  for (const q of TABLE_SQL) {
    await sql(q);
  }
  console.log("Tables created.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
