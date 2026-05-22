import { test, expect } from '@playwright/test';

const STORIES = [
  'breakpointcontext-examples--standard',
  'breakpointcontext-examples--car',
];

const IGNORED_ERROR_PATTERNS = [
  /ResizeObserver loop/i,
  /Failed to load resource.*favicon/i,
  /WebSocket connection.*closed/i,
  /\[BreakpointProvider\] Element width is undefined or 0/i,
];

for (const storyId of STORIES) {
  test(`story ${storyId} renders without console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);

    await expect(
      page.locator('p').filter({ hasText: /Current width:/i }).first(),
    ).toBeVisible({ timeout: 15_000 });

    const realErrors = errors.filter(
      (e) => !IGNORED_ERROR_PATTERNS.some((p) => p.test(e)),
    );

    expect(
      realErrors,
      `unexpected console errors in ${storyId}:\n${realErrors.join('\n')}`,
    ).toHaveLength(0);
  });
}
