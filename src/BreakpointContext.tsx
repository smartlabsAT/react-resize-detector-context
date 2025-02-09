import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';

export type Breakpoint = string; // Allow arbitrary breakpoint names

export interface BreakpointContextType {
  /** Current width of the observed element */
  width: number;
  /** Currently active breakpoint */
  breakpoint: Breakpoint | null;
  /** Defined breakpoints, e.g., { XS: 0, SM: 500, MD: 700, LG: 900, XL: 1100 } */
  breakpoints: Record<Breakpoint, number>;
  /**
   * Returns `true` if the current breakpoint is greater than or equal to the provided one.
   * E.g.: isAtLeast('MD') returns true if the current breakpoint is MD, LG, or XL.
   */
  isAtLeast: (size: Breakpoint) => boolean;
  /**
   * Returns `true` if the current breakpoint is less than the provided one.
   */
  isBelow: (size: Breakpoint) => boolean;
  /**
   * Returns a value from the mapping based on the current breakpoint.
   * E.g.: valueByBreakpoint({ MD: 3, LG: 2 }) returns 3 for MD and 2 for LG.
   */
  valueByBreakpoint: <T>(values: Partial<Record<Breakpoint, T>>) => T | undefined;
}

const BreakpointContext = createContext<BreakpointContextType | undefined>(undefined);

/**
 * Instead of using React.RefObject<HTMLElement> (which is invariant),
 * we use a structural type that accepts any object with a `current: HTMLElement | null` property.
 */
export interface BreakpointProviderProps {
  /** Defined breakpoints */
  breakpoints: Record<Breakpoint, number>;
  /** Child components that use the context */
  children: React.ReactNode;
  /**
   * Optional: Provide a ref to the element to be observed.
   * If not provided, an internal <div ref={...}> will be rendered.
   */
  targetRef?: { current: HTMLElement | null };
}

/**
 * BreakpointProvider 🚀
 *
 * Uses react-resize-detector to measure the width of an element and determine the current breakpoint
 * based on the provided breakpoints. Additionally, it provides utility functions (isAtLeast, isBelow)
 * and valueByBreakpoint.
 *
 * ⚠️ **Edge Cases / Warnings:**
 * - If the measured width is undefined or 0, an error is logged in the console.
 * - If the current width is less than the smallest breakpoint (and width > 0), an error is logged.
 * - If duplicate breakpoint values are detected, an error is logged.
 */
export const BreakpointProvider: React.FC<BreakpointProviderProps> = ({
                                                                        breakpoints,
                                                                        children,
                                                                        targetRef,
                                                                      }) => {
  // If a targetRef is provided, useResizeDetector observes that element; otherwise, an internal ref is created.
  const { width, ref } = useResizeDetector({ targetRef });

  // Sort the breakpoints in ascending order based on their numeric values. 🔢
  const sortedBreakpoints = useMemo(() => {
    return Object.entries(breakpoints)
      .map(([key, value]) => [key, value] as [Breakpoint, number])
      .sort(([, a], [, b]) => a - b);
  }, [breakpoints]);

  // Check for duplicate breakpoint values
  useEffect(() => {
    const duplicates = sortedBreakpoints.filter(
      ([, value], index) =>
        sortedBreakpoints.findIndex(([, v]) => v === value) !== index
    );
    if (duplicates.length > 0) {
      console.error(
        'BreakpointProvider: Duplicate breakpoint values detected. This may lead to unexpected behavior.'
      );
    }
  }, [sortedBreakpoints]);

  // Determine the current breakpoint based on the measured width. 📏
  const currentBreakpoint = useMemo(() => {
    if (width === undefined) return null;
    let active: Breakpoint | null = null;
    sortedBreakpoints.forEach(([key, value]) => {
      if (width >= value) {
        active = key;
      }
    });
    return active;
  }, [width, sortedBreakpoints]);

  // Log error if width > 0 but no breakpoint could be determined
  useEffect(() => {
    if (width !== undefined && width > 0 && currentBreakpoint === null) {
      if (sortedBreakpoints.length > 0 && width < sortedBreakpoints[0][1]) {
        console.error(
          `BreakpointProvider: The current width (${width}px) is less than the smallest breakpoint value (${sortedBreakpoints[0][1]}px). Consider including a breakpoint with a value of 0 to cover all cases.`
        );
      } else {
        console.error(
          'BreakpointProvider: No breakpoint could be determined from the provided configuration. Check your breakpoints object.'
        );
      }
    }
  }, [width, currentBreakpoint, sortedBreakpoints]);

  // Helper function to get the index of a breakpoint in the sorted array. 🔍
  const getBreakpointIndex = (size: Breakpoint): number => {
    return sortedBreakpoints.findIndex(([key]) => key === size);
  };

  const isAtLeast = (size: Breakpoint): boolean => {
    if (!currentBreakpoint) return false;
    return getBreakpointIndex(currentBreakpoint) >= getBreakpointIndex(size);
  };

  const isBelow = (size: Breakpoint): boolean => {
    if (!currentBreakpoint) return false;
    return getBreakpointIndex(currentBreakpoint) < getBreakpointIndex(size);
  };

  // Define valueByBreakpoint as a function declaration to avoid JSX parsing issues in TSX files. 🎨
  function valueByBreakpoint<T>(values: Partial<Record<Breakpoint, T>>): T | undefined {
    if (!currentBreakpoint) return undefined;
    return values[currentBreakpoint];
  }

  return (
    <BreakpointContext.Provider
      value={{
        width: width ?? 0,
        breakpoint: currentBreakpoint,
        breakpoints,
        isAtLeast,
        isBelow,
        valueByBreakpoint,
      }}
    >
      {/* If a targetRef is provided, that ref is already attached to an external element.
          Otherwise, render a <div ref={ref}> to observe its size. 📐 */}
      {targetRef ? children : <div ref={ref}>{children}</div>}
    </BreakpointContext.Provider>
  );
};

/**
 * Hook for accessing the BreakpointContext.
 * Throws an error if used outside of a BreakpointProvider. ⚠️
 */
export const useBreakpoint = (): BreakpointContextType => {
  const context = useContext(BreakpointContext);
  if (!context) {
    throw new Error('useBreakpoint must be used within a BreakpointProvider');
  }
  return context;
};

interface BreakpointConditionalProps {
  /**
   * Array of breakpoints at which the children should be displayed.
   * E.g.: ['MD', 'LG'] renders children only if the current breakpoint is MD or LG.
   */
  show?: Breakpoint[];
  /**
   * The children are displayed only if the current breakpoint is at least this value.
   * E.g.: isAtLeast="MD" renders children for MD, LG, or XL.
   */
  isAtLeast?: Breakpoint;
  /**
   * The children are displayed only if the current breakpoint is below this value.
   */
  isBelow?: Breakpoint;
  children: React.ReactNode;
}

/**
 * BreakpointConditional 🎨
 *
 * Renders its children only if all provided conditions regarding the current breakpoint are met.
 */
export const BreakpointConditional: React.FC<BreakpointConditionalProps> = ({
                                                                              show,
                                                                              isAtLeast: minSize,
                                                                              isBelow: maxSize,
                                                                              children,
                                                                            }) => {
  const { breakpoint, isAtLeast: contextIsAtLeast, isBelow: contextIsBelow } = useBreakpoint();

  let shouldRender = true;

  if (show && breakpoint) {
    shouldRender = shouldRender && show.includes(breakpoint);
  }
  if (minSize) {
    shouldRender = shouldRender && contextIsAtLeast(minSize);
  }
  if (maxSize) {
    shouldRender = shouldRender && contextIsBelow(maxSize);
  }

  return shouldRender ? <>{children}</> : null;
};