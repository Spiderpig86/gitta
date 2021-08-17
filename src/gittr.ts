import * as Inquirer from 'inquirer';
import * as PromptConstructor from 'inquirer-autocomplete-prompt';
import chalk from 'chalk';

import { Config } from './utils/config';
import { CommitPrompter, ConfigPrompter, SearchPrompter } from './commands';
import { Logger, LogSeverity } from './utils/logger';
import Constants from './utils/constants';
import { EmojiService, PrefixService } from './services';
import { toEmojiItemConsoleOutput } from './utils/functions';

Inquirer.registerPrompt('autocomplete', PromptConstructor);

// TODO: Refactor so code is in isolated command dirs later
/**
 * Main class handling CLI functionality.
 *
 * @export
 * @class Gittr
 */
export default class Gittr {
    private api: any;
    private config: Config;
    private emojiService: EmojiService;

    constructor(api: any) {
        // TODO: Add client for refereshing most recent list of emojis
        this.api = api;
        this.config = new Config();
        this.setDefaultPreferences(this.config);
        this.emojiService = new EmojiService();
    }

    public commit(): void {
        Logger.log(`commit called`, LogSeverity.DEBUG);
        const commitPrompter = new CommitPrompter(this.config, this.emojiService);
        commitPrompter.prompt();
    }

    public reconfig(): void {
        Logger.log(`reconfig called`, LogSeverity.DEBUG);
        const configPrompter: ConfigPrompter = new ConfigPrompter(this.config, this.emojiService);
        configPrompter.prompt();
    }

    /**
     * Lists all default/custom emojis defined in Gittr.
     */
    public async listEmojis(): Promise<void> {
        Logger.log(`list called`, LogSeverity.DEBUG);

        const emojiModel = await this.emojiService.getEmojiModel();
        return emojiModel.emojis.forEach((emojiItemModel) =>
            console.log(toEmojiItemConsoleOutput(emojiItemModel))
        ); // TODO: Needs to be custom formatter to display emojis, place into commands/common folder
    }

    public async search(): Promise<void> {
        const searchPrompter: SearchPrompter = new SearchPrompter(this.config, this.emojiService);
        const emojis = await this.emojiService.getEmojiModel();
        if (emojis) {
            searchPrompter.prompt();
        } else {
            Logger.log('Unable to fetch emojis.', LogSeverity.ERROR);
        }
    }

    public update() {}

    public version(): void {
        Logger.log(`about called`, LogSeverity.DEBUG);
        console.log(`${Constants.APP_NAME} - ${Constants.APP_VERSION}`);
    }

    // PRIVATE METHODS

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
        if (config.getIsUdacityStyleCommit() === undefined) {
            config.setUdacityStyleCommit(true);
        }
    }
}
