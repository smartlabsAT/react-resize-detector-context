# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/smartlabsat/react-resize-detector-context/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/smartlabsat/react-resize-detector-context/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/smartlabsat/react-resize-detector-context/releases/tag/v0.1.2