"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handles execution of functions from flags given function mapping.
 *
 * @export
 * @class Cli
 */
class Cli {
    constructor(cli, handlers) {
        this.cli = cli;
        this.handlers = handlers;
    }
    /**
     * Executes a given handler based on user input flags to the console application.
     *
     * @returns {void}
     * @memberof Cli
     */
    executeCommandFromFlags() {
        const matchedFlagCommand = Object.keys(this.cli.flags)
            .map((flag) => this.cli.flags[flag] && flag)
            .filter((flag) => this.handlers[flag])[0];
        return matchedFlagCommand && this.handlers[matchedFlagCommand]
            ? this.handlers[matchedFlagCommand]()
            : this.cli.showHelp();
    }
}
exports.default = Cli;
