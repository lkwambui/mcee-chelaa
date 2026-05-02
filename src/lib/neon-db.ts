import { Pool } from "pg";

declare global {
  var __mcchelaaPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is missing. Configure your Neon connection string.");
  }

  const isLocal = connectionString.includes("localhost") || connectionString.includes("127.0.0.1");

  return new Pool({
    connectionString,
    ssl: isLocal ? false : { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
}

export function getDbPool() {
  if (!global.__mcchelaaPool) {
    global.__mcchelaaPool = createPool();
  }

  return global.__mcchelaaPool;
}
