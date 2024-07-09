import * as Conf from 'conf';
import { ConfModel } from '../models';
import Constants from './constants';

/**
 * Configuration manager for Gitta
 *
 * @export
 * @class Config
 */
export class Config {
    private conf: Conf<any>;

    constructor() {
        const schema: ConfModel = {
            [Constants.SETTINGS_ADD_ALL_KEY]: {
                type: 'boolean',
                default: Constants.SETTINGS_DEFAULT_ADD_ALL,
            },
            [Constants.SETTINGS_EMOJI_FORMAT_KEY]: {
                type: 'string',
                default: Constants.SETTINGS_EMOJI_FORMAT_MARKDOWN,
            },
            [Constants.SETTINGS_SIGN_COMMIT_KEY]: {
                type: 'boolean',
                default: Constants.SETTINGS_DEFAULT_SIGN_COMMIT,
            },
            [Constants.SETTINGS_ENABLE_CONVENTIONAL_COMMITS_STANDARD_KEY]: {
                type: 'boolean',
                default: Constants.SETTINGS_DEFAULT_ENABLE_CONVENTIONAL_COMMITS,
            },
            [Constants.SETTINGS_UPDATE_EMOJIS_URL_KEY]: {
                // TODO: Validate proper URL with json
                type: 'string',
                default: Constants.SETTINGS_DEFAULT_EMOJI_UPDATE_URL,
            },
            [Constants.SETTINGS_UPDATE_PREFIX_URL_KEY]: {
                // TODO: Validate proper URL with json
                type: 'string',
                default: Constants.SETTINGS_DEFAULT_PREFFIX_UPDATE_URL,
            },
        };
        this.conf = new Conf({
            projectName: Constants.APP_NAME, // Required for standalone CLI, cannot resolve package.json
        });
        if (this.conf.store === undefined) {
            this.conf.set(schema);
        }
    }

    public getAddAll(): boolean {
        return this.conf.get(Constants.SETTINGS_ADD_ALL_KEY);
    }
    public getEmojiFormat(): string {
        return this.conf.get(Constants.SETTINGS_EMOJI_FORMAT_KEY);
    }
    public getSignCommit(): boolean {
        return this.conf.get(Constants.SETTINGS_SIGN_COMMIT_KEY);
    }
    public getIsConventionalCommits(): boolean {
        return this.conf.get(Constants.SETTINGS_ENABLE_CONVENTIONAL_COMMITS_STANDARD_KEY);
    }
    public getEmojiUpdateUrl(): string {
        return this.conf.get(Constants.SETTINGS_UPDATE_EMOJIS_URL_KEY);
    }
    public getPrefixUpdateUrl(): string {
        return this.conf.get(Constants.SETTINGS_UPDATE_PREFIX_URL_KEY);
    }

    public setAddAll(addAll: boolean): void {
        this.conf.set(Constants.SETTINGS_ADD_ALL_KEY, addAll);
    }
    public setEmojiFormat(emojiFormat: string): void {
        this.conf.set(Constants.SETTINGS_EMOJI_FORMAT_KEY, emojiFormat);
    }
    public setSignCommit(signCommit: boolean): void {
        this.conf.set(Constants.SETTINGS_SIGN_COMMIT_KEY, signCommit);
    }
    public setConventionalCommits(useConventionalCommits: boolean): void {
        this.conf.set(Constants.SETTINGS_ENABLE_CONVENTIONAL_COMMITS_STANDARD_KEY, useConventionalCommits);
    }
    public setEmojiUpdateUrl(emojiUpdateUrl: string): void {
        this.conf.set(Constants.SETTINGS_UPDATE_EMOJIS_URL_KEY, emojiUpdateUrl);
    }
    public setPrefixUpdateUrl(prefixUpdateUrl: boolean): void {
        this.conf.set(Constants.SETTINGS_UPDATE_PREFIX_URL_KEY, prefixUpdateUrl);
    }

    /**
     * Get an object containing all of the configuration values.
     *
     * @returns {{ [s: string]: any }} - the object containing all of the configuration key and values.
     * @memberof Config
     */
    public getConfigValues(): { [s: string]: any } {
        return this.conf.store;
    }
}
