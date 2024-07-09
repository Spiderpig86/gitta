#!/usr/bin/env node

import * as Meow from 'meow';

import Gitta from './src/gitta';
import Cli from './src/utils/cli/cli';
import { Commands } from './src/utils/constants';

const meow = Meow(
    `
    Usage
        $ gitta -[cehlrsuv]
    
    Options
        --${Commands.COMMIT}, -c        An interactive prompt that handles committing your changes.
        --${Commands.EDIT}, -e          Edit stored emoji/prefix files.
        --${Commands.HELP}, -h          Display help message.
        --${Commands.LIST}, -l          List your configured gitta emojis/prefixes.
        --${Commands.RECONFIG}, -r      Reconfigure gitta settings.
        --${Commands.SEARCH}, -s        Search for emoji given keywords.
        --${Commands.UPDATE}, -u        Refresh list of emojis/prefixes (does not overwrite custom).
        --${Commands.VERSION}, -v       Display version of gitta.

    Examples
        gitta -l
`,
    {
        flags: {
            [Commands.COMMIT]: {
                type: 'boolean',
                alias: 'c',
            },
            [Commands.RECONFIG]: {
                type: 'boolean',
                alias: 'r',
            },
            [Commands.LIST]: {
                type: 'boolean',
                alias: 'l',
            },
            [Commands.SEARCH]: {
                type: 'boolean',
                alias: 's',
            },
            [Commands.EDIT]: {
                type: 'boolean',
                alias: 'e',
            },
            [Commands.HELP]: {
                type: 'boolean',
                alias: 'h',
            },
            [Commands.UPDATE]: {
                type: 'boolean',
                alias: 'u',
            },
            [Commands.VERSION]: {
                type: 'boolean',
                alias: 'v',
            },
        },
    }
);

const handlers = {
    [Commands.COMMIT]: () => {
        gitta.commit();
    },
    [Commands.RECONFIG]: () => {
        gitta.reconfig();
    },
    [Commands.LIST]: () => {
        gitta.list();
    },
    [Commands.SEARCH]: () => {
        gitta.search();
    },
    [Commands.EDIT]: () => {
        gitta.edit();
    },
    [Commands.HELP]: () => {
        gitta.help(meow);
    },
    [Commands.UPDATE]: () => {
        gitta.update();
    },
    [Commands.VERSION]: () => {
        gitta.version();
    },
};

const gitta = new Gitta();
const cli: Cli = new Cli(meow, handlers);
cli.executeCommandFromFlags();
