/**
 * Architecture rules (DEC-006): packages/core holds the business use cases and must stay
 * framework-free so that an API can be extracted later without rewriting any logic.
 * @type {import('dependency-cruiser').IConfiguration}
 */
module.exports = {
  forbidden: [
    {
      name: "core-is-framework-free",
      severity: "error",
      comment: "packages/core must not depend on next, react or react-dom (DEC-006).",
      from: { path: "^packages/core/" },
      to: { path: "(^|/)node_modules/(next|react|react-dom)/" },
    },
    {
      name: "core-does-not-import-apps",
      severity: "error",
      comment: "Dependencies point inwards: apps depend on core, never the reverse.",
      from: { path: "^packages/" },
      to: { path: "^apps/" },
    },
    {
      name: "db-does-not-import-core",
      severity: "error",
      comment: "packages/db is the persistence layer used by core, not the other way round.",
      from: { path: "^packages/db/" },
      to: { path: "^packages/core/" },
    },
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: { path: "(^|/)(generated|[.]next|coverage)/" },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.base.json" },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
    },
  },
};
