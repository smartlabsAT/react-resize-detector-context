import { test, expect, type Page } from '@playwright/test';

const STORY = '/iframe.html?id=breakpointcontext-examples--standard&viewMode=story';

const breakpointLine = (page: Page) =>
  page.locator('p').filter({ hasText: /Current breakpoint:/i }).first();

test.describe('standard breakpoint detection', () => {
  test('reports a small breakpoint at narrow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(STORY);

    const label = breakpointLine(page);
    await expect(label).toBeVisible({ timeout: 15_000 });
    await expect(label).toContainText(/(XS|SM)\b/);
  });

  test('reports a large breakpoint at wide viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(STORY);

    const label = breakpointLine(page);
    await expect(label).toBeVisible({ timeout: 15_000 });
    await expect(label).toContainText(/(MD|LG|XL)\b/);
  });

  test('breakpoint label updates after viewport resize', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(STORY);

    const label = breakpointLine(page);
    await expect(label).toBeVisible({ timeout: 15_000 });
    const initial = (await label.textContent())?.trim() ?? '';

    await page.setViewportSize({ width: 320, height: 800 });
    await expect
      .poll(async () => (await label.textContent())?.trim(), { timeout: 5_000 })
      .not.toBe(initial);
  });
});
