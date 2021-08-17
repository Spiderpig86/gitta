#!/usr/bin/env node

import * as Meow from 'meow';

import Gittr from './src/gittr';
import Cli from './src/utils/cli/cli';
import Handlers from './src/utils/cli/handlers';
import { api } from './src/modules';
import { Commands } from './src/utils/constants';

const meow = Meow(`
    Usage
        $ gittr -[crlsv]
    
    Options
        --${Commands.COMMIT}, -c        An interactive prompt that handles committing your changes.
        --${Commands.RECONFIG}, -r      Reconfigure gittr settings.
        --${Commands.LIST}, -l          List your configured gittr emojis
        --${Commands.SEARCH}, -s        Search for emoji given keywords.
        --${Commands.UPDATE}, -u        Refresh list of emojis/prefixes.
        --${Commands.VERSION}, -v       Display version of gittr.

    Examples
        gittr -s bugfix
        gittr -l
`, {
    flags: {
        [Commands.COMMIT]: {
            type: 'boolean',
            alias: 'c'
        },
        [Commands.RECONFIG]: {
            type: 'boolean',
            alias: 'r'
        },
        [Commands.LIST]: {
            type: 'boolean',
            alias: 'l'
        },
        [Commands.SEARCH]: {
            type: 'boolean',
            alias: 's'
        },
        [Commands.UPDATE]: {
            type: 'boolean',
            alias: 'u'
        },
        [Commands.VERSION]: {
            type: 'boolean',
            alias: 'v'
        }
    }
});

const gittr = new Gittr(api);
const handlers = new Handlers(gittr);
const cli: Cli = new Cli(meow, handlers);
cli.executeCommandFromFlags();