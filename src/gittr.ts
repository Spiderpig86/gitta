import * as Inquirer from 'inquirer';
import * as ParentDirs from 'parent-dirs';
import * as Path from 'path';
import * as PathExists from 'path-exists';
import * as PromptConstructor from 'inquirer-autocomplete-prompt';

import { Config } from './utils/config';
import { ConfigPrompter } from './utils/prompts';
import Constants from './utils/constants';

Inquirer.registerPrompt(
    'autocomplete', PromptConstructor
)

/**
 * Main class handling CLI functionality.
 *
 * @export
 * @class Gittr
 */
export default class Gittr {

    private api: any;

    constructor(api: any) {
        // TODO: Add client for refereshing most recent list of emojis
        this.api = api;
        const config: Config = new Config();
        this.setDefaultPreferences(config);
    }

    public commit(): void {
        console.log(`commit called`);
    }

    public reconfig(): void {
        console.log(`reconfig called`);
        const configPrompter: ConfigPrompter = new ConfigPrompter();
        configPrompter.prompt();
    }

    public list(): void {
        console.log(`list called`);
    }

    public search(): void {
        console.log(`search called`);
        
    }

    public version(): void {
        console.log(`version called`);
        
    }

    // PRIVATE METHODS

    /**
     * Verify that the CLI is running within a valid Git directory.
     *
     * @private
     * @returns {boolean} - if we are currently inside a valid Git directory.
     * @memberof Gittr
     */
    private isGitRepository(): boolean {
        return ParentDirs.parentDirs(process.cwd())
            .some((directory: string) => PathExists.sync(Path.resolve(directory, '.git')));
    }

    /**
     * Handles setting default preferences for Gittr on initialization.
     *
     * @private
     * @param {Config} config - the config object used in the application.
     * @memberof Gittr
     */
    private setDefaultPreferences(config: Config): void {
        if (!config.getAddAll()) {
            config.setAddAll(true);
        }
        if (!config.getEmojiFormat()) {
            config.setEmojiFormat(Constants.SETTINGS_EMOJI_FORMAT_MARKDOWN);
        }
        if (!config.getSignCommit()) {
            config.setSignCommit(false);
        }
        if (!config.getUdacityStyleCommit()) {
            config.setUdacityStyleCommit(true);
        }
    }

}