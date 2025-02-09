# ⚛️ React Resize Detector Context

![Demo GIF](/doc/assets/demo.gif)

A lightweight React context that leverages [react-resize-detector](https://github.com/maslianok/react-resize-detector) to dynamically detect the
current breakpoint based on an element's width. It provides utility functions and helper components to conditionally render content based on
responsive breakpoints – all fully typed in TypeScript for excellent IDE support. 😎

---

## Table of Contents 📚

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
    - [Basic Usage](#basic-usage)
    - [Conditional Rendering with BreakpointConditional](#conditional-rendering-with-breakpointconditional)
    - [Custom Breakpoints Example](#custom-breakpoints-example)
- [API Documentation](#api-documentation)
    - [BreakpointProvider](#breakpointprovider)
    - [BreakpointConditional](#breakpointconditional)
    - [useBreakpoint Hook](#usebreakpoint-hook)
- [Available Scripts](#available-scripts)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

---

## Features ✨

- **Responsive Breakpoint Detection:** Dynamically calculates the active breakpoint from an element’s width.
- **Custom Breakpoints:** Define standard breakpoints like "XS", "SM", "MD", "LG", "XL" or any custom names (e.g. "Smart", "Mini", etc.).
- **Utility Methods:**
    - `isAtLeast(breakpoint)`: Returns `true` if the active breakpoint is greater than or equal to the specified breakpoint.
    - `isBelow(breakpoint)`: Returns `true` if the active breakpoint is lower than the specified breakpoint.
    - `valueByBreakpoint(mapping)`: Retrieves a value from a mapping object based on the active breakpoint.
- **Conditional Rendering:** The `BreakpointConditional` component conditionally renders content based on breakpoint conditions.
- **Full TypeScript Support:** Enjoy robust type definitions and IDE hints for a seamless development experience.

---

## Requirements

- **Node.js:** >= 18.0.0
- **React:** >= 17
- **React-DOM:** >= 17

---

## Installation

Install via npm:

``` bash
npm install my-breakpoint-package
```

---

## Usage

### Basic Usage

Wrap your component tree with the `BreakpointProvider` and supply your breakpoint configuration. Then, use the `useBreakpoint` hook to access context
values.

```typescript
import React from 'react';
import { BreakpointProvider, useBreakpoint } from 'my-breakpoint-package';

const breakpoints = {
  XS: 0,
  SM: 500,
  MD: 700,
  LG: 900,
  XL: 1100,
};

const ResponsiveComponent = () => {
  const { width, breakpoint, isAtLeast, valueByBreakpoint } = useBreakpoint();
  return (
    <div>
      <p>Current width: {width}px</p>
  <p>Active breakpoint: {breakpoint}</p>
  <p>Is at least MD: {isAtLeast('MD') ? '✅' : '❌'}</p>
  <p>
  Mapping: {valueByBreakpoint({
    XS: 'Extra Small',
    SM: 'Small',
    MD: 'Medium',
    LG: 'Large',
    XL: 'Extra Large'
  })}
  </p>
  </div>
);
};

const App = () => (
  <BreakpointProvider breakpoints={breakpoints}>
    <ResponsiveComponent />
    </BreakpointProvider>
);

export default App;
```

---

### Conditional Rendering with BreakpointConditional

Render content only when specific breakpoint conditions are met.

```typescript
import React from 'react';
import { BreakpointProvider, BreakpointConditional } from 'my-breakpoint-package';

const breakpoints = {
  XS: 0,
  SM: 500,
  MD: 700,
  LG: 900,
  XL: 1100,
};

const ConditionalComponent = () => (
  <div>
    <BreakpointConditional isAtLeast="MD">
    <p>😊 This content is visible from MD and up.</p>
</BreakpointConditional>
<BreakpointConditional isBelow="LG">
  <p>🚀 This content is visible for breakpoints below LG.</p>
</BreakpointConditional>
</div>
);

const App = () => (
  <BreakpointProvider breakpoints={breakpoints}>
    <ConditionalComponent />
    </BreakpointProvider>
);

export default App;
```

---

### Custom Breakpoints Example

Define your own custom breakpoints – for example, using car sizes:

```typescript
import React from 'react';
import { BreakpointProvider, useBreakpoint } from 'my-breakpoint-package';

const carBreakpoints = {
  Smart: 0,
  Mini: 350,
  Sedan: 600,
  SUV: 900,
  Ram: 1200,
};

const CarComponent = () => {
  const { width, breakpoint, valueByBreakpoint } = useBreakpoint();
  return (
    <div>
      <p>Current width: {width}px</p>
  <p>Active car size: {breakpoint}</p>
  <p>
  Mapping: {valueByBreakpoint({
    Smart: '🚗 Smart',
    Mini: '🚙 Mini',
    Sedan: '🚘 Sedan',
    SUV: '🚐 SUV',
    Ram: '🚚 Ram'
  })}
  </p>
  </div>
);
};

const App = () => ( <BreakpointProvider breakpoints={carBreakpoints}>
      <CarComponent /> 
    </BreakpointProvider>
);

export default App;
```

---

## API Documentation

### BreakpointProvider

The `BreakpointProvider` sets up the responsive context by measuring the width of an element and determining the active breakpoint based on the
provided configuration.

| Property    | Type                                          | Description                                                                                                                                               | Default                  |
|-------------|-----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| breakpoints | `Record<Breakpoint, number>`                  | An object defining your breakpoints. The keys are the breakpoint names (e.g., "XS", "SM", "MD", etc.), and the values are the minimum widths (in pixels). | **Required**             |
| children    | `React.ReactNode`                             | Child components that consume the breakpoint context.                                                                                                     | **Required**             |
| targetRef   | `{ current: HTMLElement \| null }` (optional) | A reference to the element whose width is observed. If not provided, an internal `<div>` is rendered to attach the ref.                                   | Internal `<div>` is used |

**Notes:**

- If the measured width is `undefined` or `0`, an error is logged in the console.
- If duplicate breakpoint values are detected, a warning is logged.

---

### BreakpointConditional

The `BreakpointConditional` component conditionally renders its children based on the active breakpoint.

| Property  | Type              | Description                                                                                                      | Default      |
|-----------|-------------------|------------------------------------------------------------------------------------------------------------------|--------------|
| show      | `Breakpoint[]`    | An array of breakpoint names. The children are rendered only if the active breakpoint is included in this array. | Not set      |
| isAtLeast | `Breakpoint`      | The children are rendered only if the active breakpoint is greater than or equal to this value.                  | Not set      |
| isBelow   | `Breakpoint`      | The children are rendered only if the active breakpoint is lower than this value.                                | Not set      |
| children  | `React.ReactNode` | The content to render if the condition is met.                                                                   | **Required** |

*Note:* Multiple conditions can be combined; all specified conditions must be met for the children to render.

---

### useBreakpoint Hook

The `useBreakpoint` hook provides access to the responsive context. It returns an object with the following properties and methods:

| Property/Method                                                                  | Type                                                            | Description                                                                                                                                      |
|----------------------------------------------------------------------------------|-----------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| **width**                                                                        | `number`                                                        | The current width (in pixels) of the observed element.                                                                                           |
| **breakpoint**                                                                   | `Breakpoint \| null`                                            | The active breakpoint based on the current width. Returns `null` if no breakpoint is determined or if width is undefined.                        |
| **breakpoints**                                                                  | `Record<Breakpoint, number>`                                    | The breakpoint configuration provided to the `BreakpointProvider`.                                                                               |
| **isAtLeast(breakpoint: Breakpoint): boolean**                                   | `(breakpoint: Breakpoint) => boolean`                           | Returns `true` if the active breakpoint is greater than or equal to the specified breakpoint.                                                    |
| **isBelow(breakpoint: Breakpoint): boolean**                                     | `(breakpoint: Breakpoint) => boolean`                           | Returns `true` if the active breakpoint is lower than the specified breakpoint.                                                                  |
| **valueByBreakpoint<T>(values: Partial<Record<Breakpoint, T>>): T \| undefined** | `<T>(values: Partial<Record<Breakpoint, T>>) => T \| undefined` | Returns a value from the provided mapping based on the active breakpoint. If no value is mapped for the current breakpoint, returns `undefined`. |

#### Example Usage of `useBreakpoint`

```typescript
import React from 'react';
import { BreakpointProvider, useBreakpoint } from 'my-breakpoint-package';

const breakpoints = {
  XS: 0,
  SM: 500,
  MD: 700,
  LG: 900,
  XL: 1100,
};

const ResponsiveComponent = () => {
  const { width, breakpoint, isAtLeast, valueByBreakpoint } = useBreakpoint();
  return (
    <div>
      <p>Current width: {width}px</p>
  <p>Active breakpoint: {breakpoint}</p>
  <p>Is at least MD: {isAtLeast('MD') ? '✅' : '❌'}</p>
  <p>
  Mapping: {valueByBreakpoint({
    XS: 'Extra Small',
    SM: 'Small',
    MD: 'Medium',
    LG: 'Large',
    XL: 'Extra Large',
  })}
  </p>
  </div>
);
};

const App = () => (
  <BreakpointProvider breakpoints={breakpoints}>
    <ResponsiveComponent />
    </BreakpointProvider>
);

export default App;
```

---

## Available Scripts 🚀

The following scripts are available in this package:

- **`npm run build`**  
  Builds the package using `tsup` (bundles and compiles your source code).

- **`npm run dev`**  
  Runs development mode concurrently with build watch, Storybook, and tests.

- **`npm run storybook`**  
  Launches Storybook on port 6006 for interactive component demos.

- **`npm run storybook:build`**  
  Builds the Storybook static site.

- **`npm run test`**  
  Runs tests using Vitest.

- **`npm run test:ci`**  
  Runs tests with coverage.

- **`npm run lint`**  
  Runs biome to check (and optionally fix) your code style.

- **`npm run release`**  
  Builds the package and triggers the release process.

- **`npm run link:self`**  
  Creates a global link for local development/testing.

---

## Contribution Guidelines 🤝

Contributions are very welcome! If you would like to help improve this package, please follow these guidelines:

1. **Fork the Repository:**  
   Fork this repository to your own GitHub account.

2. **Create a Branch:**  
   Create a new branch for your feature or bug fix (e.g., `feature/awesome-improvement`).

3. **Make Your Changes:**  
   Ensure that your changes follow the coding style and that all tests pass.

4. **Submit a Pull Request:**  
   Once your changes are ready, open a pull request with a clear description of your modifications and the rationale behind them.

5. **Issues:**  
   If you find bugs or have suggestions, please open an issue to discuss before starting work on a pull request.

Let's build something awesome together! 🚀✨

---

## License

This project is licensed under the MIT License.