import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Prisma 7 no longer loads .env files: load the repository root one in local development.
// In CI and Docker the variable comes from the environment and no file exists.
config({ path: "../../.env", quiet: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx --env-file-if-exists=../../.env prisma/seed.ts",
  },
  datasource: {
    // Not env(): it throws when the variable is missing, which breaks `prisma generate`
    // in build steps that have no database.
    url: process.env.DATABASE_URL ?? "",
  },
});
