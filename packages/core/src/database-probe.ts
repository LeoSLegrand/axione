import type { PrismaClient } from "@axione/db";
import type { HealthProbe } from "./health";

/** Health probe that checks the database answers a trivial query. */
export function databaseProbe(db: Pick<PrismaClient, "$queryRaw">): HealthProbe {
  return () => db.$queryRaw`SELECT 1`;
}
