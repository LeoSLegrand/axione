import { createPrismaClient } from "../src/client.js";

const collections = [
  { slug: "running", name: "Running", position: 1 },
  { slug: "cyclisme", name: "Cyclisme", position: 2 },
  { slug: "trail", name: "Trail", position: 3 },
];

const prisma = createPrismaClient();

try {
  for (const collection of collections) {
    await prisma.collection.upsert({
      where: { slug: collection.slug },
      update: { name: collection.name, position: collection.position },
      create: collection,
    });
  }
  console.log(`Seeded ${collections.length} collections.`);
} finally {
  await prisma.$disconnect();
}
