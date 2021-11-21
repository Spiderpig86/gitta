import * as Meow from 'meow';

export interface Handlers {
    [s: string]: () => void;
}

/**
 * Handles execution of functions from flags given function mapping.
 *
 * @export
 * @class Cli
 */
export default class Cli {
    private cli: Meow.Result;
    private handlers: Handlers;

    constructor(cli: Meow.Result, handlers: Handlers) {
        this.cli = cli;
        this.handlers = handlers;
    }

    /**
     * Executes a given handler based on user input flags to the console application.
     *
     * @returns {void}
     * @memberof Cli
     */
    public executeCommandFromFlags(): void {
        const matchedFlagCommand = Object.keys(this.cli.flags)
            .map((flag) => this.cli.flags[flag] && flag)
            .filter((flag) => this.handlers[flag])[0];

        return matchedFlagCommand && this.handlers[matchedFlagCommand]
            ? this.handlers[matchedFlagCommand]()
            : this.cli.showHelp();
    }
}
