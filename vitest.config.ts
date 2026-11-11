import { defineConfig } from "vitest/config";

const testDatabaseUrl =
  process.env.TEST_DATABASE_URL ?? "postgresql://axione:axione@localhost:54329/axione_test";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["packages/*/src/**/*.test.ts", "apps/web/src/**/*.test.{ts,tsx}"],
          exclude: ["**/*.int.test.ts", "**/node_modules/**"],
          environment: "node",
        },
      },
      {
        test: {
          name: "integration",
          include: ["packages/*/src/**/*.int.test.ts", "apps/web/src/**/*.int.test.ts"],
          environment: "node",
          globalSetup: ["./test/integration-setup.ts"],
          env: { DATABASE_URL: testDatabaseUrl },
          // Tests share one database: run files one after another.
          fileParallelism: false,
        },
      },
    ],
    coverage: {
      provider: "v8",
      include: ["packages/core/src/**/*.ts"],
      exclude: ["**/*.test.ts", "**/index.ts"],
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "coverage",
      // NF-06: blocking threshold on business logic.
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
