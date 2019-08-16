import * as Meow from 'meow';

import Gittr from '../../gittr';
import Handlers from './handlers';

/**
 * Handles execution of functions from flags given function mapping.
 *
 * @export
 * @class Cli
 */
export default class Cli {

    private cli: Meow.Result;
    private handlers: Handlers;

    constructor(gittr: Gittr, cli: Meow.Result, handlers: Handlers) {
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
        const matchedFlagCommmand = Object.keys(this.cli.flags)
            .map(flag => this.cli.flags[flag] && flag)
            .filter(flag => this.handlers.handlers[flag])[0];

        return this.handlers.handlers[matchedFlagCommmand] ?
                this.handlers.handlers[matchedFlagCommmand]() :
                this.cli.showHelp();
    }
}