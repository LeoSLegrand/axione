import { execSync } from "node:child_process";
import pg from "pg";

/**
 * Prepares a dedicated, disposable test database: creates it if needed, then applies the
 * Prisma migrations. Development data in the main database is never touched.
 */
export default async function setup(): Promise<void> {
  const url = new URL(
    process.env.TEST_DATABASE_URL ?? "postgresql://axione:axione@localhost:54329/axione_test",
  );
  const databaseName = url.pathname.slice(1);

  const adminUrl = new URL(url);
  adminUrl.pathname = "/postgres";
  const admin = new pg.Client({ connectionString: adminUrl.toString() });
  await admin.connect();
  try {
    const { rowCount } = await admin.query("SELECT 1 FROM pg_database WHERE datname = $1", [
      databaseName,
    ]);
    if (rowCount === 0) {
      await admin.query(`CREATE DATABASE "${databaseName.replaceAll('"', '""')}"`);
    }
  } finally {
    await admin.end();
  }

  // Static command, no user input: safe to run through the shell (pnpm is a .cmd on Windows).
  execSync("pnpm --filter @axione/db exec prisma migrate deploy", {
    env: { ...process.env, DATABASE_URL: url.toString() },
    stdio: "inherit",
  });
}
