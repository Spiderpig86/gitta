import * as Meow from 'meow';

import Gittr from '../gittr';

/**
 * Handles execcution of functions from flags given function mapping.
 *
 * @export
 * @class Cli
 */
export default class Cli {

    private flags: Meow.Result;
    private handlers: Map<string, (() => void)>;

    constructor(gittr: Gittr, flags: Meow.Result, handlers: Map<string, (() => void)>) {
        this.flags = flags;
        this.handlers = handlers;
    }

}