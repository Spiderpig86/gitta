import * as Meow from 'meow';

import Gittr from './src/gittr';
import Cli from './src/utils/cli/cli';
import Handlers from './src/utils/cli/handlers';
import { api } from './src/modules';

const meow = Meow(`
    Usage
        $ gittr -[cplsv]
    
    Options
        --commit, -c        An interactive prompt that handles committing your changes.
        --reconfig, -r      Reconfigure gittr settings
        --list, -l          List your configured gittr emojis
        --search, -s        Search for emoji given keywords.
        --version, -v       Display version of gittr.
`, {
    flags: {
        commit: {
            type: 'boolean',
            alias: 'c'
        },
        prefs: {
            type: 'boolean',
            alias: 'p'
        },
        list: {
            type: 'boolean',
            alias: 'l'
        },
        search: {
            type: 'boolean',
            alias: 's'
        },
        version: {
            type: 'boolean',
            alias: 'v'
        }
    }
});

const gittr = new Gittr(api);
const handlers = new Handlers(gittr);
const cli: Cli = new Cli(gittr, meow, handlers);
cli.executeCommandFromFlags();