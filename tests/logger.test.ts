import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from '../src/utils/logger';

describe('Logger', () => {
  let consoleSpy: {
    log: ReturnType<typeof vi.spyOn>;
    warn: ReturnType<typeof vi.spyOn>;
    error: ReturnType<typeof vi.spyOn>;
  };

  beforeEach(() => {
    consoleSpy = {
      log: vi.spyOn(console, 'log').mockImplementation(() => {}),
      warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
      error: vi.spyOn(console, 'error').mockImplementation(() => {})
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Reset NODE_ENV to original value
    process.env.NODE_ENV = 'test';
  });

  describe('in development mode', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('should log debug messages', () => {
      logger.debug('Test debug message', { key: 'value' });

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[BreakpointProvider] Test debug message',
        { key: 'value' }
      );
    });

    it('should log info messages', () => {
      logger.info('Test info message', { key: 'value' });

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[BreakpointProvider] Test info message',
        { key: 'value' }
      );
    });

    it('should log warn messages', () => {
      logger.warn('Test warn message', { key: 'value' });

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        '[BreakpointProvider] Test warn message',
        { key: 'value' }
      );
    });

    it('should log error messages', () => {
      logger.error('Test error message', { key: 'value' });

      expect(consoleSpy.error).toHaveBeenCalledWith(
        '[BreakpointProvider] Test error message',
        { key: 'value' }
      );
    });

    it('should handle logging without data parameter', () => {
      logger.info('Test message without data');

      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[BreakpointProvider] Test message without data',
        ''
      );
    });
  });

  describe('in production mode', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    it('should not log debug messages', () => {
      logger.debug('Test debug message');

      expect(consoleSpy.log).not.toHaveBeenCalled();
    });

    it('should not log info messages', () => {
      logger.info('Test info message');

      expect(consoleSpy.log).not.toHaveBeenCalled();
    });

    it('should not log warn messages', () => {
      logger.warn('Test warn message');

      expect(consoleSpy.warn).not.toHaveBeenCalled();
    });

    it('should still log error messages', () => {
      logger.error('Test error message', { key: 'value' });

      expect(consoleSpy.error).toHaveBeenCalledWith(
        '[BreakpointProvider] Test error message',
        { key: 'value' }
      );
    });
  });

  describe('in test mode (non-development, non-production)', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'test';
    });

    it('should log all message types in test mode', () => {
      logger.debug('Debug in test');
      logger.info('Info in test');
      logger.warn('Warn in test');
      logger.error('Error in test');

      expect(consoleSpy.log).toHaveBeenCalledTimes(2); // debug and info
      expect(consoleSpy.warn).toHaveBeenCalledTimes(1);
      expect(consoleSpy.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('structured data logging', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('should log complex structured data correctly', () => {
      const complexData = {
        duplicates: [
          { key: 'SM', value: 500 },
          { key: 'MD', value: 500 }
        ],
        message: 'This may lead to unexpected behavior'
      };

      logger.error('Duplicate breakpoint values detected', complexData);

      expect(consoleSpy.error).toHaveBeenCalledWith(
        '[BreakpointProvider] Duplicate breakpoint values detected',
        complexData
      );
    });

    it('should handle nested object data', () => {
      const nestedData = {
        currentWidth: 400,
        smallestBreakpoint: 500,
        smallestBreakpointName: 'SM',
        suggestion: 'Consider including a breakpoint with a value of 0'
      };

      logger.error('Current width is less than smallest breakpoint', nestedData);

      expect(consoleSpy.error).toHaveBeenCalledWith(
        '[BreakpointProvider] Current width is less than smallest breakpoint',
        nestedData
      );
    });
  });
});