export type ComponentStatus = "up" | "down";

export interface ComponentCheck {
  name: string;
  status: ComponentStatus;
  latencyMs?: number;
}

export interface HealthReport {
  status: "ok" | "degraded";
  checks: ComponentCheck[];
  checkedAt: string;
}

/** Aggregates component checks: the application is "ok" only when every component is up. */
export function aggregateHealth(checks: ComponentCheck[], now: Date = new Date()): HealthReport {
  const allUp = checks.length > 0 && checks.every((check) => check.status === "up");
  return {
    status: allUp ? "ok" : "degraded",
    checks,
    checkedAt: now.toISOString(),
  };
}
