"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const constants_1 = require("./constants");
var LogSeverity;
(function (LogSeverity) {
    LogSeverity[LogSeverity["DEBUG"] = 0] = "DEBUG";
    LogSeverity[LogSeverity["INFO"] = 1] = "INFO";
    LogSeverity[LogSeverity["WARNING"] = 2] = "WARNING";
    LogSeverity[LogSeverity["ERROR"] = 3] = "ERROR";
})(LogSeverity = exports.LogSeverity || (exports.LogSeverity = {}));
/**
 * Logger used for logging out messages based on severity.
 *
 * @export
 * @class Logger
 */
class Logger {
    static debug(message) {
        Logger.log(message, LogSeverity.DEBUG);
    }
    static info(message) {
        Logger.log(message, LogSeverity.INFO);
    }
    static warning(message) {
        Logger.log(message, LogSeverity.WARNING);
    }
    static error(message) {
        Logger.log(message, LogSeverity.ERROR);
    }
    static log(message, severity) {
        if (constants_1.default.LOG_SEVERITY >= severity) {
            return;
        }
        switch (severity) {
            case LogSeverity.DEBUG:
                console.log(chalk_1.default.white(`[${new Date().toISOString()}] - ${message}`));
                break;
            case LogSeverity.INFO:
                console.log(chalk_1.default.blue(`[${new Date().toISOString()}] - ${message}`));
                break;
            case LogSeverity.WARNING:
                console.log(chalk_1.default.yellowBright(`[${new Date().toISOString()}] - ${message}`));
                break;
            case LogSeverity.ERROR:
                console.log(chalk_1.default.redBright(`[${new Date().toISOString()}] - ${message}`));
                break;
        }
    }
}
exports.Logger = Logger;
