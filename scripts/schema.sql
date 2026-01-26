-- Run this in Neon SQL Editor (Dashboard → SQL Editor) or via psql
-- https://console.neon.tech → your project → SQL Editor

CREATE TABLE IF NOT EXISTS "departments" (
  "id" serial PRIMARY KEY NOT NULL,
  "slug" varchar(64) NOT NULL UNIQUE,
  "name" varchar(256) NOT NULL,
  "description" text,
  "accent_color" varchar(32)
);

CREATE TABLE IF NOT EXISTS "resources" (
  "id" serial PRIMARY KEY NOT NULL,
  "department_id" integer NOT NULL REFERENCES "departments"("id") ON DELETE CASCADE,
  "semester" integer NOT NULL,
  "type" varchar(32) NOT NULL,
  "url" text,
  "label" varchar(256)
);

CREATE TABLE IF NOT EXISTS "feedback" (
  "id" serial PRIMARY KEY NOT NULL,
  "message" text NOT NULL,
  "contact" varchar(256),
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "config" (
  "key" varchar(64) PRIMARY KEY NOT NULL,
  "value" text
);
