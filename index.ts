#!/usr/bin/env node

import * as Meow from 'meow';

import Gittr from './src/gittr';
import Cli from './src/utils/cli/cli';
import Handlers from './src/utils/cli/handlers';
import { api } from './src/modules';

const meow = Meow(`
    Usage
        $ gittr -[crlsv]
    
    Options
        --commit, -c        An interactive prompt that handles committing your changes.
        --reconfig, -r      Reconfigure gittr settings.
        --list, -l          List your configured gittr emojis
        --search, -s        Search for emoji given keywords.
        --version, -v       Display version of gittr.

    Examples
        gittr -s bugfix
        gittr -l
`, {
    flags: {
        commit: {
            type: 'boolean',
            alias: 'c'
        },
        reconfig: {
            type: 'boolean',
            alias: 'r'
        },
        list: {
            type: 'boolean',
            alias: 'l'
        },
        search: {
            type: 'boolean',
            alias: 's'
        },
        about: {
            type: 'boolean',
            alias: 'a'
        }
    }
});

const gittr = new Gittr(api);
const handlers = new Handlers(gittr);
const cli: Cli = new Cli(meow, handlers);
cli.executeCommandFromFlags();