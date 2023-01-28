export interface Logger {
  log(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  debug(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
}

class DefaultLogger implements Logger {
  log(message?: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);
  }
  error(message?: any, ...optionalParams: any[]) {
    console.error(message, ...optionalParams);
  }
  warn(message?: any, ...optionalParams: any[]) {
    console.warn(message, ...optionalParams);
  }
  debug(message?: any, ...optionalParams: any[]) {
    console.debug(message, ...optionalParams);
  }
  info(message?: any, ...optionalParams: any[]) {
    console.info(message, ...optionalParams);
  }
}

export class LoggerService {
  private static instance: LoggerService;
  private logger: Logger;

  level = "info";

  private constructor(logger?: Logger) {
    this.logger = logger || new DefaultLogger();
  }

  public static getInstance(logger?: Logger): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService(logger);
    }
    return LoggerService.instance;
  }

  public log(message: string): void {
    this.logger.log(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public debug(message: string): void {
    if (this.level !== "debug") return;
    this.logger.debug(message);
  }

  public setLogger(logger: Logger) {
    this.logger = logger;
  }

  public setLevel(level: string) {
    this.level = level;
  }
}

export const logger = LoggerService.getInstance();
