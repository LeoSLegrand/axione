import { defineConfig, devices } from "@playwright/test";

const externalBaseUrl = process.env.E2E_BASE_URL;
const port = 3100;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: externalBaseUrl ?? `http://localhost:${port}`,
    trace: "retain-on-failure",
    // The CI stack is served by Caddy with a certificate from its internal authority.
    ignoreHTTPSErrors: process.env.E2E_IGNORE_HTTPS_ERRORS === "true",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Without E2E_BASE_URL, run against the locally built application (pnpm build first).
  ...(externalBaseUrl
    ? {}
    : {
        webServer: {
          command: "pnpm --filter @axione/web start",
          url: `http://localhost:${port}/api/health`,
          reuseExistingServer: !process.env.CI,
          env: { PORT: String(port) },
          timeout: 60_000,
        },
      }),
});
