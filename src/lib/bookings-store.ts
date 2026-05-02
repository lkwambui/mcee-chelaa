import { randomUUID } from "node:crypto";
import { getDbPool } from "@/lib/neon-db";

export type BookingEntry = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  source: "form" | "fallback";
};

let tableReady: Promise<void> | null = null;

async function ensureStorage() {
  const dbPool = getDbPool();

  if (!tableReady) {
    tableReady = dbPool
      .query(`
        CREATE TABLE IF NOT EXISTS bookings (
          id text PRIMARY KEY,
          name text NOT NULL,
          email text NOT NULL,
          message text NOT NULL,
          source text NOT NULL CHECK (source IN ('form', 'fallback')),
          created_at timestamptz NOT NULL DEFAULT now()
        );
      `)
      .then(() => undefined);
  }

  await tableReady;
}

export async function getBookings(): Promise<BookingEntry[]> {
  await ensureStorage();
  const dbPool = getDbPool();

  const result = await dbPool.query<{
    id: string;
    name: string;
    email: string;
    message: string;
    source: "form" | "fallback";
    created_at: string;
  }>(
    `
      SELECT id, name, email, message, source, created_at
      FROM bookings
      ORDER BY created_at DESC
      LIMIT 500;
    `
  );

  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    source: row.source,
    createdAt: row.created_at,
  }));
}

export async function saveBooking(input: Omit<BookingEntry, "id" | "createdAt">) {
  await ensureStorage();
  const dbPool = getDbPool();

  const nextRecord: BookingEntry = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  await dbPool.query(
    `
      INSERT INTO bookings (id, name, email, message, source, created_at)
      VALUES ($1, $2, $3, $4, $5, $6);
    `,
    [nextRecord.id, nextRecord.name, nextRecord.email, nextRecord.message, nextRecord.source, nextRecord.createdAt]
  );

  return nextRecord;
}
