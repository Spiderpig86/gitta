#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Meow = require("meow");
const gitta_1 = require("./src/gitta");
const cli_1 = require("./src/utils/cli/cli");
const constants_1 = require("./src/utils/constants");
const meow = Meow(`
    Usage
        $ gitta -[cehlrsuv]
    
    Options
        --${constants_1.Commands.COMMIT}, -c        An interactive prompt that handles committing your changes.
        --${constants_1.Commands.EDIT}, -e          Edit stored emoji/prefix files.
        --${constants_1.Commands.HELP}, -h          Display help message.
        --${constants_1.Commands.LIST}, -l          List your configured gitta emojis/prefixes.
        --${constants_1.Commands.RECONFIG}, -r      Reconfigure gitta settings.
        --${constants_1.Commands.SEARCH}, -s        Search for emoji given keywords.
        --${constants_1.Commands.UPDATE}, -u        Refresh list of emojis/prefixes (does not overwrite custom).
        --${constants_1.Commands.VERSION}, -v       Display version of gitta.

    Examples
        gitta -l
`, {
    flags: {
        [constants_1.Commands.COMMIT]: {
            type: 'boolean',
            alias: 'c',
        },
        [constants_1.Commands.RECONFIG]: {
            type: 'boolean',
            alias: 'r',
        },
        [constants_1.Commands.LIST]: {
            type: 'boolean',
            alias: 'l',
        },
        [constants_1.Commands.SEARCH]: {
            type: 'boolean',
            alias: 's',
        },
        [constants_1.Commands.EDIT]: {
            type: 'boolean',
            alias: 'e',
        },
        [constants_1.Commands.HELP]: {
            type: 'boolean',
            alias: 'h',
        },
        [constants_1.Commands.UPDATE]: {
            type: 'boolean',
            alias: 'u',
        },
        [constants_1.Commands.VERSION]: {
            type: 'boolean',
            alias: 'v',
        },
    },
});
const handlers = {
    [constants_1.Commands.COMMIT]: () => {
        gitta.commit();
    },
    [constants_1.Commands.RECONFIG]: () => {
        gitta.reconfig();
    },
    [constants_1.Commands.LIST]: () => {
        gitta.list();
    },
    [constants_1.Commands.SEARCH]: () => {
        gitta.search();
    },
    [constants_1.Commands.EDIT]: () => {
        gitta.edit();
    },
    [constants_1.Commands.HELP]: () => {
        gitta.help(meow);
    },
    [constants_1.Commands.UPDATE]: () => {
        gitta.update();
    },
    [constants_1.Commands.VERSION]: () => {
        gitta.version();
    },
};
const gitta = new gitta_1.default();
const cli = new cli_1.default(meow, handlers);
cli.executeCommandFromFlags();
