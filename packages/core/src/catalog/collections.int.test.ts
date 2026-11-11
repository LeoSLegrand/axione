import { createPrismaClient } from "@axione/db";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { listCollections } from "./collections";

const prisma = createPrismaClient();

beforeEach(async () => {
  await prisma.collection.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("[F-10] listCollections (PostgreSQL)", () => {
  it("returns collections in display order", async () => {
    await prisma.collection.createMany({
      data: [
        { slug: "trail", name: "Trail", position: 3 },
        { slug: "running", name: "Running", position: 1 },
        { slug: "cyclisme", name: "Cyclisme", position: 2 },
      ],
    });

    await expect(listCollections(prisma)).resolves.toEqual([
      { slug: "running", name: "Running" },
      { slug: "cyclisme", name: "Cyclisme" },
      { slug: "trail", name: "Trail" },
    ]);
  });

  it("returns an empty list when the catalogue is empty", async () => {
    await expect(listCollections(prisma)).resolves.toEqual([]);
  });

  it("rejects duplicate slugs at the database level", async () => {
    await prisma.collection.create({ data: { slug: "running", name: "Running" } });
    await expect(
      prisma.collection.create({ data: { slug: "running", name: "Autre" } }),
    ).rejects.toThrow();
  });
});
