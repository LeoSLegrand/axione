-- Reference data: the three product ranges (F-10). Idempotent.
INSERT INTO "collection" ("id", "slug", "name", "position", "updated_at")
VALUES
  (gen_random_uuid(), 'running', 'Running', 1, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cyclisme', 'Cyclisme', 2, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'trail', 'Trail', 3, CURRENT_TIMESTAMP)
ON CONFLICT ("slug") DO NOTHING;
