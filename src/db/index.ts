import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema"; // Import your schema for type safety

// Load environment variables
const envPath =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
config({ path: envPath });

// Initialize Neon client
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}
const sql = neon(databaseUrl);

// Initialize Drizzle with schema and optional logging
const db = drizzle(sql, {
  schema,
  logger: process.env.NODE_ENV !== "production",
});

export { db };
