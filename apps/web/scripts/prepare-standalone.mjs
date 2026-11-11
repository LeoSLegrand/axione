// Copies static assets next to the standalone server, as `next build` does not (DEC-012).
import { cpSync, existsSync } from "node:fs";

const target = ".next/standalone/apps/web";
cpSync(".next/static", `${target}/.next/static`, { recursive: true });
if (existsSync("public")) {
  cpSync("public", `${target}/public`, { recursive: true });
}
