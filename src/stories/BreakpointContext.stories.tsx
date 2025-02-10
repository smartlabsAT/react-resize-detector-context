// src/stories/BreakpointContext.stories.tsx
import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { BreakpointProvider, BreakpointConditional, Breakpoint, useBreakpoint } from '../BreakpointContext'; // Resolved via tsconfig paths
import { Box, Container, Card, CardContent, Typography, LinearProgress, useTheme } from '@mui/material';

// --- Internal Components (NOT exported as standalone stories) ---

export const DisplayBreakpointInfo: React.FC = () => {
  const { width, breakpoint, breakpoints: bpMap, valueByBreakpoint } = useBreakpoint();
  const theme = useTheme();

  const roundedWidth = Math.round(width);

  const progressData = React.useMemo(() => {
    if (!breakpoint) return { percent: 0, diff: 0, label: 'N/A' };
    const sortedKeys = Object.keys(bpMap) as Array<keyof typeof bpMap>;
    const currentIndex = sortedKeys.indexOf(breakpoint as keyof typeof bpMap);
    if (currentIndex === -1 || currentIndex === sortedKeys.length - 1) {
      return { percent: 100, diff: 0, label: '💻 100% (Max)' };
    }
    const lower = bpMap[sortedKeys[currentIndex]];
    const upper = bpMap[sortedKeys[currentIndex + 1]];
    const percent = ((width - lower) / (upper - lower)) * 100;
    const diff = Math.round(upper - width);
    return {
      percent: Math.min(Math.max(percent, 0), 100),
      diff,
      label: `💻 ${Math.round(percent)}% | ${diff}px to next`,
    };
  }, [width, breakpoint, bpMap]);

  const mapping: Partial<Record<Breakpoint, string>> = {
    XS: '😅 Extra Small',
    SM: '😊 Small',
    MD: '😎 Medium',
    LG: '🤩 Large',
    XL: '🚀 Extra Large',
  };

  const bgColor = breakpoint
    ? {
        XS: theme.palette.error.light,
        SM: theme.palette.warning.light,
        MD: theme.palette.info.light,
        LG: theme.palette.success.light,
        XL: theme.palette.primary.light,
      }[breakpoint as keyof typeof mapping]
    : theme.palette.background.paper;

  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: bgColor,
        transition: 'background-color 0.3s ease',
        borderRadius: 0,
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          🔍 Standard Breakpoint Info
        </Typography>
        <Typography variant="body1">
          <strong>Current width:</strong> {roundedWidth}px
        </Typography>
        <Typography variant="body1">
          <strong>Current breakpoint:</strong> {breakpoint ?? 'none'}
        </Typography>
        <Typography variant="body1">
          <strong>Mapping:</strong> {valueByBreakpoint(mapping) ?? ''}
        </Typography>
        <Box sx={{ mt: 2, position: 'relative', width: 300 }}>
          <LinearProgress variant="determinate" value={progressData.percent} sx={{ height: 20, borderRadius: 0 }} />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.getContrastText(bgColor || 'black'),
              fontWeight: 'bold',
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '0.875rem',
            }}
          >
            {progressData.label}
          </Box>
        </Box>
        <Box sx={{ mt: 1 }}>
          <BreakpointConditional isAtLeast="MD">
            <Typography variant="body2">🤖 Content visible from MD and up.</Typography>
          </BreakpointConditional>

          <BreakpointConditional isAtLeast="LG">
            <Typography variant="body2">🚀 Content visible from LG and up.</Typography>
          </BreakpointConditional>

          <BreakpointConditional isBelow={'MD'}>
            <Typography variant="body2">👾Content visible from below MD.</Typography>
          </BreakpointConditional>
        </Box>
      </CardContent>
    </Card>
  );
};

export const CarBreakpointInfo: React.FC = () => {
  const { width, breakpoint, breakpoints: bpMap, valueByBreakpoint } = useBreakpoint();
  const theme = useTheme();

  const roundedWidth = Math.round(width);

  const progressData = React.useMemo(() => {
    if (!breakpoint) return { percent: 0, diff: 0, label: 'N/A' };
    const sortedKeys = Object.keys(bpMap) as Array<keyof typeof bpMap>;
    const currentIndex = sortedKeys.indexOf(breakpoint as keyof typeof bpMap);
    if (currentIndex === -1 || currentIndex === sortedKeys.length - 1) {
      return { percent: 100, diff: 0, label: '💻 100% (Max)' };
    }
    const lower = bpMap[sortedKeys[currentIndex]];
    const upper = bpMap[sortedKeys[currentIndex + 1]];
    const percent = ((width - lower) / (upper - lower)) * 100;
    const diff = Math.round(upper - width);
    return {
      percent: Math.min(Math.max(percent, 0), 100),
      diff,
      label: `💻 ${Math.round(percent)}% | ${diff}px to next`,
    };
  }, [width, breakpoint, bpMap]);

  const carMapping: Partial<Record<Breakpoint, string>> = {
    Smart: '🚗 Smart',
    Mini: '🚙 Mini',
    Sedan: '🚘 Sedan',
    SUV: '🚐 SUV',
    Ram: '🚚 Ram',
  };

  const bgColor = breakpoint
    ? {
        Smart: theme.palette.info.light,
        Mini: theme.palette.success.light,
        Sedan: theme.palette.warning.light,
        SUV: theme.palette.error.light,
        Ram: theme.palette.primary.light,
      }[breakpoint as keyof typeof carMapping]
    : theme.palette.background.paper;

  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: bgColor,
        transition: 'background-color 0.3s ease',
        borderRadius: 0,
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          🚘 Car Breakpoint Info
        </Typography>
        <Typography variant="body1">
          <strong>Current width:</strong> {roundedWidth}px
        </Typography>
        <Typography variant="body1">
          <strong>Current car size:</strong> {breakpoint ?? 'none'}
        </Typography>
        <Typography variant="body1">
          <strong>Mapping:</strong> {valueByBreakpoint(carMapping) ?? ''}
        </Typography>
        <Box sx={{ mt: 2, position: 'relative', width: 300 }}>
          <LinearProgress variant="determinate" value={progressData.percent} sx={{ height: 20, borderRadius: 0 }} />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.getContrastText(bgColor || 'black'),
              fontWeight: 'bold',
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '0.875rem',
            }}
          >
            {progressData.label}
          </Box>
        </Box>
        <Box sx={{ mt: 1 }}>
          <BreakpointConditional isBelow="Sedan">
            <Typography variant="body2">🏎️ Content visible only for Smart and Mini.</Typography>
          </BreakpointConditional>
        </Box>
      </CardContent>
    </Card>
  );
};

// --- Storybook Default Export ---
// Exclude internal components (those ending with "Info") from being auto-exported as stories.
export default {
  title: 'BreakpointContext/Examples',
  excludeStories: /.*Info$/, // Excludes exports ending in "Info"
  argTypes: {},
} as Meta;

// --- Story Templates ---
const StandardTemplate: StoryFn = () => {
  const standardBreakpoints: Record<Breakpoint, number> = {
    XS: 0,
    SM: 500,
    MD: 700,
    LG: 900,
    XL: 1100,
  };

  const standardBoxRef = React.useRef<HTMLDivElement>(null);

  return (
    <BreakpointProvider breakpoints={standardBreakpoints} targetRef={standardBoxRef}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          🧩 react-resize-detector-context
        </Typography>
        <Box
          ref={standardBoxRef}
          sx={{
            border: '2px dashed #ccc',
            p: 2,
            resize: 'horizontal',
            overflow: 'auto',
            transition: 'border-color 0.3s ease',
            '&:hover': { borderColor: 'primary.main' },
            borderRadius: 0,
            mb: 4,
            ml: '30px', // 30px left margin
          }}
        >
          <DisplayBreakpointInfo />
        </Box>
      </Container>
    </BreakpointProvider>
  );
};

export const Standard = StandardTemplate.bind({});
Standard.storyName = 'Default Breakpoints';

const CarTemplate: StoryFn = () => {
  const carBreakpoints: Record<Breakpoint, number> = {
    Smart: 0,
    Mini: 350,
    Sedan: 600,
    SUV: 900,
    Ram: 1200,
  };
  const carBoxRef = React.useRef<HTMLDivElement>(null);

  return (
    <BreakpointProvider breakpoints={carBreakpoints} targetRef={carBoxRef}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          🚘 Custom Breakpoints
        </Typography>
        <Box
          ref={carBoxRef}
          sx={{
            border: '2px dashed #ccc',
            p: 2,
            resize: 'horizontal',
            overflow: 'auto',
            transition: 'border-color 0.3s ease',
            '&:hover': { borderColor: 'primary.main' },
            borderRadius: 0,
            ml: '30px', // 30px left margin
          }}
        >
          <CarBreakpointInfo />
        </Box>
      </Container>
    </BreakpointProvider>
  );
};

export const Car = CarTemplate.bind({});
Car.storyName = 'Custom Breakpoints';