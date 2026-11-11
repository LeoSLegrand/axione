import { describe, expect, it } from "vitest";
import { aggregateHealth, getHealth } from "./health";

const fixedNow = new Date("2026-11-11T10:00:00.000Z");

describe("[NF-07] aggregateHealth", () => {
  it("reports ok when every component is up", () => {
    const report = aggregateHealth(
      [
        { name: "database", status: "up", latencyMs: 3 },
        { name: "cache", status: "up", latencyMs: 1 },
      ],
      fixedNow,
    );
    expect(report).toEqual({
      status: "ok",
      checks: [
        { name: "database", status: "up", latencyMs: 3 },
        { name: "cache", status: "up", latencyMs: 1 },
      ],
      checkedAt: "2026-11-11T10:00:00.000Z",
    });
  });

  it("reports degraded when one component is down", () => {
    const report = aggregateHealth(
      [
        { name: "database", status: "down", latencyMs: 2000 },
        { name: "cache", status: "up", latencyMs: 1 },
      ],
      fixedNow,
    );
    expect(report.status).toBe("degraded");
  });

  it("reports degraded when nothing was checked", () => {
    expect(aggregateHealth([], fixedNow).status).toBe("degraded");
  });
});

describe("[NF-07] getHealth", () => {
  it("marks a resolving probe as up", async () => {
    const report = await getHealth({ database: () => Promise.resolve() }, { now: () => fixedNow });
    expect(report.status).toBe("ok");
    expect(report.checks).toEqual([
      { name: "database", status: "up", latencyMs: expect.any(Number) as number },
    ]);
    expect(report.checkedAt).toBe("2026-11-11T10:00:00.000Z");
  });

  it("marks a rejecting probe as down without leaking the error", async () => {
    const report = await getHealth({
      database: () => Promise.reject(new Error("password authentication failed for user axione")),
    });
    expect(report.status).toBe("degraded");
    expect(JSON.stringify(report)).not.toContain("password");
  });

  it("marks a probe that exceeds the timeout as down", async () => {
    const neverResolves = () => new Promise<void>(() => undefined);
    const report = await getHealth({ database: neverResolves }, { timeoutMs: 20 });
    expect(report.checks[0]?.status).toBe("down");
  });

  it("runs probes in parallel", async () => {
    const slow = () => new Promise<void>((resolve) => setTimeout(resolve, 50));
    const startedAt = performance.now();
    await getHealth({ a: slow, b: slow, c: slow });
    expect(performance.now() - startedAt).toBeLessThan(140);
  });
});
