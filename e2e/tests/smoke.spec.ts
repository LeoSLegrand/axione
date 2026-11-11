import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Walking skeleton smoke test", () => {
  test("[F-01] home page shows the brand and the collections", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Axione Athletics");
    await expect(page.getByRole("heading", { level: 1, name: "Axione Athletics" })).toBeVisible();
    await expect(page.getByRole("list", { name: "Gammes" }).getByRole("listitem")).toHaveText([
      "Running",
      "Cyclisme",
      "Trail",
    ]);
  });

  test("[NF-02] home page has no critical or serious accessibility violation", async ({ page }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const blocking = results.violations.filter(
      (violation) => violation.impact === "critical" || violation.impact === "serious",
    );

    expect(blocking.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([]);
  });

  test("[NF-07] health endpoint reports the application up", async ({ request }) => {
    const response = await request.get("/api/health");

    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({ status: "ok" });
  });
});
