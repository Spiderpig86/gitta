import * as Inquirer from 'inquirer';
import * as ParentDirs from 'parent-dirs';
import * as Path from 'path';
import * as PathExists from 'path-exists';
import * as PromptConstructor from 'inquirer-autocomplete-prompt';

import { Config } from './utils/config';
import { ConfigPrompter, SearchPrompter } from './utils/prompts';
import { Logger, LogSeverity } from './utils/logger';
import { EmojiModel } from './models';
import CommitEmoji from './commit-emojis';
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
    private emojiSerivce: CommitEmoji;

    constructor(api: any) {
        // TODO: Add client for refereshing most recent list of emojis
        this.api = api;
        const config: Config = new Config();
        this.setDefaultPreferences(config);
        this.emojiSerivce = new CommitEmoji();
    }

    public commit(): void {
        Logger.log(`commit called`, LogSeverity.DEBUG);
    }

    public reconfig(): void {
        Logger.log(`reconfig called`, LogSeverity.DEBUG);
        const configPrompter: ConfigPrompter = new ConfigPrompter();
        configPrompter.prompt();
    }

    public list(): void {
        Logger.log(`list called`, LogSeverity.DEBUG);
    }

    public async search(): Promise<void> {
        const searchPrompter: SearchPrompter = new SearchPrompter();
        const emojis = await this.emojiSerivce.getEmojis();
        if (emojis) {
            searchPrompter.prompt(emojis);
        } else {
            Logger.log('Unable to fetch emojis.', LogSeverity.ERROR);
        }
    }

    public about(): void {
        Logger.log(`about called`, LogSeverity.DEBUG);
        console.log(`${Constants.APP_NAME} - ${Constants.APP_VERSION}`);
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
        console.log(config.getConfigValues());
        if (config.getAddAll() === undefined) {
            config.setAddAll(true);
        }
        if (config.getEmojiFormat() === undefined) {
            config.setEmojiFormat(Constants.SETTINGS_EMOJI_FORMAT_MARKDOWN);
        }
        if (config.getSignCommit() === undefined) {
            config.setSignCommit(false);
        }
        if (config.getUdacityStyleCommit() === undefined) {
            config.setUdacityStyleCommit(true);
        }
    }

}