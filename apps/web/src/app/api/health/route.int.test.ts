import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("[NF-07] GET /api/health", () => {
  it("answers 200 with a JSON report and disables caching", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    const body = (await response.json()) as { status: string; checks: { name: string }[] };
    expect(body.status).toBe("ok");
    expect(body.checks.map((check) => check.name)).toEqual(["database"]);
  });
});
