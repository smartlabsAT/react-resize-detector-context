# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.7] - 2026-05-22

CI plumbing only — no runtime/library changes. Tarball is identical to 0.2.6.

### Fixed
- `Publish` workflow: replaced `bitovi/github-actions-storybook-to-github-pages@v1.0.2`
  (broken due to its transitive `actions/upload-artifact@v3` dependency being
  disabled by GitHub) with a native Pages deploy chain
  (`actions/configure-pages@v5` + `actions/upload-pages-artifact@v3` +
  `actions/deploy-pages@v4`). v0.2.6's Pages deploy had failed silently for
  this reason; v0.2.7 restores it.
- `Publish` workflow: reactivated the previously commented-out npm publish step.
  Now runs `npm publish --provenance --access public` with `id-token: write`
  for OIDC-signed provenance attestations, gated on `release` events so manual
  `workflow_dispatch` reruns don't try to re-publish.

### Required for the workflow

- Repo secret `NPM_TOKEN` (npm Granular Access Token scoped to
  `react-resize-detector-context` with read+write) must be configured for the
  `npm-publish` job to authenticate.

## [0.2.6] - 2026-05-12

Comprehensive Q2 2026 dependency upgrade (Epic #18).

### Added
- Playwright e2e test suite running against built Storybook (5 specs covering
  story smoke checks and breakpoint detection across viewport sizes)
- New scripts: `test:e2e`, `test:e2e:ui`, `test:e2e:install`, `storybook:e2e`
  (dedicated port 6010 to avoid collisions with default 6006)
- `@playwright/test` devDep
- `@emotion/react` devDep (required peer of MUI 9)
- `@eslint-react/eslint-plugin` (modern React lint rules with ESLint 10 support)

### Changed
- **BREAKING**: `engines.node` raised from `>=18.0.0` to `>=20.0.0`. Node 18
  reached EOL on 2025-04-30 and Vitest 4 / React 19 / `@types/node` 25 require
  Node 20+.
- React 18 → 19 (devDep + types). `peerDependencies` for consumers remain
  `>=17`; no React-19-only API is used in the lib's public surface.
- Storybook 8 → 10 (all `@storybook/*` packages; addon consolidation applied
  per the official Storybook 9/10 migration guides).
- MUI 6 → 9 (devDep — used in Storybook stories only).
- TypeScript 5.9 → 6.0. Added `types: ["node"]` and `ignoreDeprecations: "6.0"`
  to `tsconfig.json` (the latter for tsup's internal DTS generator).
- Vitest 2 → 4 (+ Vite 8 as required peer). `@vitest/coverage-v8` matched.
- ESLint 9 → 10 via migration to `@eslint-react/eslint-plugin`. The legacy
  `eslint-plugin-react` has no ESLint 10 support yet.
- Tooling: `release-it` 17 → 20, `lefthook` 1 → 2, `jsdom` 25 → 29,
  `@types/node` 22 → 25, `typescript-eslint` 8.54 → 8.59.
- Internally adopted React 19 idioms: `<BreakpointContext value={...}>` instead
  of `.Provider`, `use(BreakpointContext)` instead of `useContext(...)`.
  Public API unchanged.
- CI workflows updated for Node 20+ engines; pnpm pinned to v10; matrix tests
  now run on Node 20.x and 22.x; codecov-action upgraded v3 → v5.

### Fixed
- `BreakpointContext.tsx`: missing `shouldLog` dependency in the
  width-vs-smallest-breakpoint `useEffect`. Runtime `devMode` toggles now
  correctly re-evaluate the log gate (caught by the new ESLint setup).

### Removed
- `react-test-renderer` and `@types/react-test-renderer` (deprecated in React
  19, not used in this project).
- `eslint-plugin-react` (replaced by `@eslint-react/eslint-plugin`).
- `eslint-plugin-react-hooks` (redundant — `@eslint-react` ships both
  `rules-of-hooks` and `exhaustive-deps`).
- Storybook consolidations no longer pinned individually: `@storybook/react`,
  `@storybook/blocks`, `@storybook/addon-essentials`,
  `@storybook/addon-interactions`, `@storybook/test` (their functionality
  moved into the `storybook` core package in v9).

## [0.2.0] - 2025-07-12

### Added
- Added `devMode` prop to BreakpointProvider to control console logging
- Added CHANGELOG.md file
- Added proper TypeScript compiler options for better type safety
- Added repository metadata to package.json

### Changed
- Updated dependencies to latest versions (ESLint, Storybook, TypeScript-ESLint, Prettier)
- Moved @emotion/styled from dependencies to devDependencies (only used in Storybook)
- Optimized build configuration (external source maps instead of inline)
- Improved TypeScript configuration with stricter compiler options
- Made automatic `pnpm link:self` after build optional

### Fixed
- Fixed import examples in README.md (was using 'my-breakpoint-package')
- Fixed missing package.json metadata (description, author, license, keywords)
- Removed duplicate @emotion/styled dependency
- Fixed security vulnerability in @babel/runtime

## [0.1.2] - 2025-02-10

### Added
- Initial release of react-resize-detector-context
- BreakpointProvider component for responsive breakpoint detection
- BreakpointConditional component for conditional rendering
- useBreakpoint hook for accessing breakpoint context
- Utility methods: isAtLeast, isBelow, valueByBreakpoint
- Full TypeScript support
- Storybook stories with examples
- Comprehensive documentation

[Unreleased]: https://github.com/smartlabsat/react-resize-detector-context/compare/v0.2.7...HEAD
[0.2.7]: https://github.com/smartlabsat/react-resize-detector-context/compare/v0.2.6...v0.2.7
[0.2.6]: https://github.com/smartlabsat/react-resize-detector-context/compare/v0.2.5...v0.2.6
[0.2.0]: https://github.com/smartlabsat/react-resize-detector-context/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/smartlabsat/react-resize-detector-context/releases/tag/v0.1.2