import { listCollections } from "@axione/core";
import { getPrisma } from "@axione/db";
import styles from "./page.module.css";

// Rendered per request: the page reads the database, which does not exist at build time.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const collections = await listCollections(getPrisma());

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Axione Athletics</h1>
      <div className={styles.bar} aria-hidden="true" />
      <p>Prototype en construction. Nos gammes :</p>
      <ul className={styles.list} aria-label="Gammes">
        {collections.map((collection) => (
          <li key={collection.slug} className={styles.item}>
            {collection.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
