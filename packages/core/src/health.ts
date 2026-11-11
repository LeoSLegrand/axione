export type ComponentStatus = "up" | "down";

export interface ComponentCheck {
  name: string;
  status: ComponentStatus;
  latencyMs: number;
}

export interface HealthReport {
  status: "ok" | "degraded";
  checks: ComponentCheck[];
  checkedAt: string;
}

/** A probe resolves when the component answers and rejects otherwise. */
export type HealthProbe = () => Promise<unknown>;

/** Aggregates component checks: the application is "ok" only when every component is up. */
export function aggregateHealth(checks: ComponentCheck[], now: Date = new Date()): HealthReport {
  const allUp = checks.length > 0 && checks.every((check) => check.status === "up");
  return {
    status: allUp ? "ok" : "degraded",
    checks,
    checkedAt: now.toISOString(),
  };
}

async function runProbe(
  name: string,
  probe: HealthProbe,
  timeoutMs: number,
): Promise<ComponentCheck> {
  const startedAt = performance.now();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${name} probe timed out`)), timeoutMs);
  });
  try {
    await Promise.race([probe(), timeout]);
    return { name, status: "up", latencyMs: Math.round(performance.now() - startedAt) };
  } catch {
    return { name, status: "down", latencyMs: Math.round(performance.now() - startedAt) };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Runs every probe in parallel (NF-07). Errors are reported as "down" and never leak details
 * such as connection strings to the caller.
 */
export async function getHealth(
  probes: Record<string, HealthProbe>,
  options: { timeoutMs?: number; now?: () => Date } = {},
): Promise<HealthReport> {
  const { timeoutMs = 2_000, now = () => new Date() } = options;
  const checks = await Promise.all(
    Object.entries(probes).map(([name, probe]) => runProbe(name, probe, timeoutMs)),
  );
  return aggregateHealth(checks, now());
}
