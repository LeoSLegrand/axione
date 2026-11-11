import { createPrismaClient } from "@axione/db";
import { afterAll, describe, expect, it } from "vitest";
import { databaseProbe } from "./database-probe";
import { getHealth } from "./health";

const prisma = createPrismaClient();
const unreachable = createPrismaClient("postgresql://axione:axione@127.0.0.1:1/axione_test");

afterAll(async () => {
  await Promise.all([prisma.$disconnect(), unreachable.$disconnect()]);
});

describe("[NF-07] databaseProbe (PostgreSQL)", () => {
  it("reports the database up when it answers", async () => {
    const report = await getHealth({ database: databaseProbe(prisma) });
    expect(report.status).toBe("ok");
  });

  it("reports the database down when it is unreachable", async () => {
    const report = await getHealth({ database: databaseProbe(unreachable) });
    expect(report.status).toBe("degraded");
  });
});
