import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type BookingEntry = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  source: "form" | "fallback";
};

const dataDirectory = path.join(process.cwd(), "data");
const dataFile = path.join(dataDirectory, "bookings.json");

async function ensureStorage() {
  await mkdir(dataDirectory, { recursive: true });
}

export async function getBookings(): Promise<BookingEntry[]> {
  await ensureStorage();

  try {
    const raw = await readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw) as BookingEntry[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

export async function saveBooking(input: Omit<BookingEntry, "id" | "createdAt">) {
  const bookings = await getBookings();

  const nextRecord: BookingEntry = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  const nextBookings = [nextRecord, ...bookings].slice(0, 500);
  await writeFile(dataFile, JSON.stringify(nextBookings, null, 2), "utf8");

  return nextRecord;
}
