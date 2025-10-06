export interface Logger {
  debug(message: string, data?: Record<string, unknown>): void;
  info(message: string, data?: Record<string, unknown>): void;
  warn(message: string, data?: Record<string, unknown>): void;
  error(message: string, data?: Record<string, unknown>): void;
}

interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
  context: string;
}

class BreakpointLogger implements Logger {
  private shouldLog(level: string): boolean {
    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) return level === 'error';
    return true; // Log everything in non-production environments
  }

  private formatMessage(level: string, message: string, data?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level: level as LogEntry['level'],
      message,
      data,
      timestamp: new Date().toISOString(),
      context: 'BreakpointProvider',
    };

    // Use appropriate console method based on level
    const consoleMethod = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;

    const isProduction = process.env.NODE_ENV === 'production';
    // In production, only log errors. In non-production, log everything.
    if (!isProduction || level === 'error') {
      consoleMethod(`[${entry.context}] ${entry.message}`, entry.data || '');
    }
  }

  debug(message: string, data?: Record<string, unknown>): void {
    this.formatMessage('debug', message, data);
  }

  info(message: string, data?: Record<string, unknown>): void {
    this.formatMessage('info', message, data);
  }

  warn(message: string, data?: Record<string, unknown>): void {
    this.formatMessage('warn', message, data);
  }

  error(message: string, data?: Record<string, unknown>): void {
    this.formatMessage('error', message, data);
  }
}

export const logger = new BreakpointLogger();
