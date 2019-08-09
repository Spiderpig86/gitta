import * as Meow from 'meow';

import Gittr from './src/gittr';

const cli = Meow(`
    Usage
        $ gittr -[cplsv]
    
    Options
        --commit, -c        An interactive prompt that handles committing your changes.
        --prefs, -p         Reconfigure gittr settings
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

const gittr = new Gittr();