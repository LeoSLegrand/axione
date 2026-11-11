import type { PrismaClient } from "@axione/db";

export interface CollectionSummary {
  slug: string;
  name: string;
}

type CollectionReader = Pick<PrismaClient, "collection">;

/** Lists the product ranges in display order (F-10). */
export async function listCollections(db: CollectionReader): Promise<CollectionSummary[]> {
  return db.collection.findMany({
    select: { slug: true, name: true },
    orderBy: [{ position: "asc" }, { name: "asc" }],
  });
}
