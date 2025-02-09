
# React Resize Detector Context

![Demo GIF](/doc/assets/demo.gif)

A lightweight React context that leverages [react-resize-detector](https://github.com/maslianok/react-resize-detector) to detect the current breakpoint based on an element's width. It provides utility functions and helper components to conditionally render content based on responsive breakpoints.

---

## Features

- Dynamically detects the current breakpoint based on element width.
- Supports custom breakpoint names (e.g., "XS", "SM", "MD", "LG", "XL" or any arbitrary names like "Smart", "Mini", etc.).
- Utility functions:
  - `isAtLeast(breakpoint)`: Returns `true` if the current breakpoint is greater than or equal to the provided one.
  - `isBelow(breakpoint)`: Returns `true` if the current breakpoint is less than the provided one.
  - `valueByBreakpoint(mapping)`: Returns a value from the provided mapping based on the current breakpoint.
- Helper component `BreakpointConditional` for conditional rendering.
- Error logging for invalid configurations (e.g. duplicate values, width not set, etc.).
- Fully typed in TypeScript with comprehensive IDE support.

---

## Requirements

- **Node.js**: >= 18.0.0  
- **React**: >= 17  
- **React-DOM**: >= 17  

---

## Installation

Install via npm:

```
npm install react-resize-detector-context
```

---

## Usage

### Basic Usage

Wrap your component tree with the `BreakpointProvider` and provide a breakpoint configuration. Then, access the current breakpoint and utility functions via the `useBreakpoint` hook.

```typescript
import React from 'react';
import { BreakpointProvider, useBreakpoint } from 'react-resize-detector-context';

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
      <p>Current breakpoint: {breakpoint}</p>
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

Use `BreakpointConditional` to render content only when certain breakpoint conditions are met.

```typescript
import React from 'react';
import { BreakpointProvider, BreakpointConditional } from 'react-resize-detector-context';

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

You can define your own custom breakpoints with any names. For instance, using car sizes:

```typescript
import React from 'react';
import { BreakpointProvider, useBreakpoint } from 'react-resize-detector-context';

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
      <p>Current car size: {breakpoint}</p>
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

const App = () => (
  <BreakpointProvider breakpoints={carBreakpoints}>
    <CarComponent />
  </BreakpointProvider>
);

export default App;
```

---

## Available Scripts

You can use the following scripts from your command line:

- **`npm run build`**  
  Builds the package (using [tsup](https://github.com/egoist/tsup)).

- **`npm run dev`**  
  Runs development mode concurrently with build watch, Storybook, and tests.

- **`npm run storybook`**  
  Launches Storybook for interactive component demos on port 6006.

- **`npm run test`**  
  Runs tests using Vitest.

- **`npm run test:ci`**  
  Runs tests with coverage.

- **`npm run lint`**  
  Runs biome check with auto-fix.

- **`npm run release`**  
  Builds and triggers the release process.

---

## License

This project is licensed under the MIT License.

---