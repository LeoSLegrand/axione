import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

// Local development keeps a single .env at the repository root. In CI and Docker the
// variables come from the environment and the file does not exist.
const rootEnvFile = path.join(repoRoot, ".env");
if (existsSync(rootEnvFile)) {
  process.loadEnvFile(rootEnvFile);
}

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Docker image (DEC-012).
  output: "standalone",
  outputFileTracingRoot: repoRoot,
  // Workspace packages are shipped as TypeScript sources.
  transpilePackages: ["@axione/core", "@axione/db"],
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
