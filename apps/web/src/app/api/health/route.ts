import { databaseProbe, getHealth } from "@axione/core";
import { getPrisma } from "@axione/db";

export const dynamic = "force-dynamic";

/** Liveness and readiness endpoint used by Docker, Caddy and monitoring (NF-07). */
export async function GET(): Promise<Response> {
  const report = await getHealth({ database: databaseProbe(getPrisma()) });
  return Response.json(report, {
    status: report.status === "ok" ? 200 : 503,
    headers: { "Cache-Control": "no-store" },
  });
}
