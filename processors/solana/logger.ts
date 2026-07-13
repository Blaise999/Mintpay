export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

class Logger {
  private static instance: Logger;
  private level: LogLevel = LogLevel.INFO;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }

  setLevel(level: LogLevel) { this.level = level; }

  private format(module: string, level: LogLevel, msg: string, meta: any = {}) {
    return JSON.stringify({
      ts: new Date().toISOString(),
      module,
      level,
      msg,
      ...meta
    });
  }

  debug(module: string, msg: string, meta: any = {}) {
    if (this.level === LogLevel.DEBUG) console.debug(this.format(module, LogLevel.DEBUG, msg, meta));
  }

  info(module: string, msg: string, meta: any = {}) {
    console.info(this.format(module, LogLevel.INFO, msg, meta));
  }

  warn(module: string, msg: string, meta: any = {}) {
    console.warn(this.format(module, LogLevel.WARN, msg, meta));
  }

  error(module: string, msg: string, meta: any = {}) {
    console.error(this.format(module, LogLevel.ERROR, msg, meta));
  }
}

export const log = Logger.getInstance();