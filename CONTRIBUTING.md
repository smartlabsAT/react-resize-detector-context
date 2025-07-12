# Contributing to react-resize-detector-context

First off, thank you for considering contributing to react-resize-detector-context! 🎉

The following is a set of guidelines for contributing to this project. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible using our bug report template.

**Great Bug Reports** tend to have:
- A quick summary and/or background
- Steps to reproduce
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please use our feature request template and include:
- A clear and descriptive title
- A detailed description of the proposed feature
- Examples of how the feature would be used
- Why this enhancement would be useful

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Setup

1. Fork and clone the repository
```bash
git clone https://github.com/your-username/react-resize-detector-context.git
cd react-resize-detector-context
```

2. Install dependencies
```bash
pnpm install
```

3. Run development mode
```bash
pnpm dev
```

This will start:
- Build watch mode
- Storybook on http://localhost:6006
- Test watch mode

## Development Workflow

### Running Tests
```bash
pnpm test        # Run tests in watch mode
pnpm test:ci     # Run tests once with coverage
```

### Linting and Formatting
```bash
pnpm lint        # Run ESLint and fix issues
pnpm format      # Format code with Prettier
```

### Building
```bash
pnpm build       # Build the package
```

### Storybook
```bash
pnpm storybook   # Run Storybook locally
```

## Coding Guidelines

### TypeScript
- Use TypeScript for all new code
- Ensure proper typing (avoid `any` when possible)
- Follow the existing code style

### React
- Use functional components with hooks
- Follow React best practices
- Keep components focused and composable

### Testing
- Write tests for new features
- Ensure existing tests pass
- Aim for high test coverage

### Comments and Documentation
- Use JSDoc comments for public APIs
- Keep the README updated
- Document breaking changes

## Commit Messages

We use conventional commits. Please follow this format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests
- `chore`: Changes to build process or auxiliary tools

Example:
```
feat(provider): add devMode prop for console logging control

Added optional devMode prop to BreakpointProvider to control when
console errors are displayed. Defaults to NODE_ENV !== 'production'.
```

## Release Process

Releases are managed by maintainers using:
```bash
pnpm release
```

This will:
1. Build the package
2. Update version
3. Create git tag
4. Push to GitHub
5. Create GitHub release
6. Publish to npm (if configured)

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🚀✨