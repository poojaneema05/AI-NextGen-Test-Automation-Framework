export enum LogLevel {
    INFO = "INFO",
    DEBUG = "DEBUG",
    WARN = "WARN",
    ERROR = "ERROR"
}


export class Logger {

    private static formatMessage(
        level: LogLevel,
        message: string
    ): string {

        const timestamp =
            new Date().toISOString();

        return `[${timestamp}] [${level}] ${message}`;
    }


    static info(message: string): void {

        console.log(
            this.formatMessage(
                LogLevel.INFO,
                message
            )
        );
    }


    static debug(message: string): void {

        console.debug(
            this.formatMessage(
                LogLevel.DEBUG,
                message
            )
        );
    }


    static warn(message: string): void {

        console.warn(
            this.formatMessage(
                LogLevel.WARN,
                message
            )
        );
    }


    static error(message: string): void {

        console.error(
            this.formatMessage(
                LogLevel.ERROR,
                message
            )
        );
    }
}