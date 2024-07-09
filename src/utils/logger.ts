import Chalk from 'chalk';

import Constants from './constants';

export enum LogSeverity {
    DEBUG,
    INFO,
    WARNING,
    ERROR
}

/**
 * Logger used for logging out messages based on severity.
 * 
 * @export
 * @class Logger
 */
export class Logger {

    public static debug(message: string) {
        Logger.log(message, LogSeverity.DEBUG);
    }
    public static info(message: string) {
        Logger.log(message, LogSeverity.INFO);
    }
    public static warning(message: string) {
        Logger.log(message, LogSeverity.WARNING);
    }
    public static error(message: string) {
        Logger.log(message, LogSeverity.ERROR);
    }
    
    public static log(message: string, severity: LogSeverity): void {
        if (Constants.LOG_SEVERITY >= severity) {
            return;
        }

        switch (severity) {
            case LogSeverity.DEBUG:
                console.log(Chalk.white(`[${new Date().toISOString()}] - ${message}`));
                break;
            case LogSeverity.INFO:
                console.log(Chalk.blue(`[${new Date().toISOString()}] - ${message}`));
                break;
            case LogSeverity.WARNING:
                console.log(Chalk.yellowBright(`[${new Date().toISOString()}] - ${message}`));
                break;
            case LogSeverity.ERROR:
                console.log(Chalk.redBright(`[${new Date().toISOString()}] - ${message}`));
                break;
        }
    }
}