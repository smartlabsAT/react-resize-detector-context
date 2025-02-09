// BreakpointContext.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BreakpointProvider, useBreakpoint, BreakpointContextType } from '../src';
import { useResizeDetector } from 'react-resize-detector';

// Mock useResizeDetector so we can control the width in tests.
vi.mock('react-resize-detector', () => ({
  useResizeDetector: vi.fn(),
}));

const mockedUseResizeDetector = useResizeDetector as jest.Mock;
// Test component that consumes the context and calls onContext with its value.
const TestComponent: React.FC<{ onContext?: (context: BreakpointContextType) => void }> = ({ onContext }) => {
  const context = useBreakpoint();
  if (onContext) onContext(context);
  return <div>Test</div>;
};

describe('BreakpointContext', () => {
  beforeEach(() => {
    mockedUseResizeDetector.mockReset();
    // Spy on console.error to check for error logs
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('throws error when useBreakpoint is used outside of provider', () => {
    expect(() => render(<TestComponent />)).toThrowError(
      'useBreakpoint must be used within a BreakpointProvider'
    );
  });

  it('computes correct breakpoint and utility functions for standard breakpoints', () => {
    // Simulate width = 800
    mockedUseResizeDetector.mockReturnValue({
      width: 800,
      ref: React.createRef<HTMLDivElement>(),
    });
    const breakpoints = { XS: 0, SM: 500, MD: 700, LG: 900, XL: 1100 };
    let contextValue: BreakpointContextType | undefined;
    render(
      <BreakpointProvider breakpoints={breakpoints}>
        <TestComponent onContext={(ctx) => (contextValue = ctx)} />
      </BreakpointProvider>
    );

    // With width=800, the active breakpoint should be "MD" (800 >= 700 but < 900)
    expect(contextValue?.width).toBe(800);
    expect(contextValue?.breakpoint).toBe('MD');
    expect(contextValue?.isAtLeast('SM')).toBe(true);
    expect(contextValue?.isAtLeast('LG')).toBe(false);
    expect(contextValue?.isBelow('LG')).toBe(true);

    const mapping = {
      XS: 'Extra Small',
      SM: 'Small',
      MD: 'Medium',
      LG: 'Large',
      XL: 'Extra Large',
    };
    expect(contextValue?.valueByBreakpoint(mapping)).toBe('Medium');
  });

  it('computes correct breakpoint and utilities for custom breakpoints', () => {
    // Simulate width = 500
    mockedUseResizeDetector.mockReturnValue({
      width: 500,
      ref: React.createRef<HTMLDivElement>(),
    });
    // Example: Custom "Car" breakpoints
    const carBreakpoints = { Smart: 0, Mini: 350, Sedan: 600, SUV: 900, Ram: 1200 };
    let contextValue: BreakpointContextType | undefined;
    render(
      <BreakpointProvider breakpoints={carBreakpoints}>
        <TestComponent onContext={(ctx) => (contextValue = ctx)} />
      </BreakpointProvider>
    );

    // With width=500, the active breakpoint should be "Mini" (500 >= 350 and < 600)
    expect(contextValue?.breakpoint).toBe('Mini');
    expect(contextValue?.isAtLeast('Smart')).toBe(true);
    expect(contextValue?.isAtLeast('Mini')).toBe(true);
    expect(contextValue?.isAtLeast('Sedan')).toBe(false);
    expect(contextValue?.isBelow('Sedan')).toBe(true);

    const mapping = {
      Smart: 'Car Smart',
      Mini: 'Car Mini',
      Sedan: 'Car Sedan',
      SUV: 'Car SUV',
      Ram: 'Car Ram',
    };
    expect(contextValue?.valueByBreakpoint(mapping)).toBe('Car Mini');
  });


  it('logs error if current width is less than the smallest breakpoint', () => {
    // Simulate width = 100 when the smallest breakpoint is 200
    mockedUseResizeDetector.mockReturnValue({
      width: 100,
      ref: React.createRef<HTMLDivElement>(),
    });
    render(
      <BreakpointProvider breakpoints={{ XS: 200, SM: 500 }}>
        <div>Test</div>
      </BreakpointProvider>
    );
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('The current width (100px) is less than the smallest breakpoint value (200px).')
    );
  });

  it('logs error if duplicate breakpoint values are detected', () => {
    // Simulate width = 600 with duplicate breakpoint values
    mockedUseResizeDetector.mockReturnValue({
      width: 600,
      ref: React.createRef<HTMLDivElement>(),
    });
    const breakpoints = { A: 0, B: 500, C: 500, D: 700 };
    render(
      <BreakpointProvider breakpoints={breakpoints}>
        <div>Test</div>
      </BreakpointProvider>
    );
    expect(console.error).toHaveBeenCalledWith(
      'BreakpointProvider: Duplicate breakpoint values detected. This may lead to unexpected behavior.'
    );
  });
});