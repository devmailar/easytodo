import { test, expect } from "@playwright/test";

test("layout", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("heading", { name: "Easyodo" }).click();
  await page.getByRole("button", { name: "Add New" }).click();
});
