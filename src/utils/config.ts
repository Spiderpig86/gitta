import * as Conf from 'conf';
import { ConfModel } from '../models';
import Constants from './constants';

/**
 * Configuration manager for Gittr
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
                default: Constants.SETTINGS_ADD_ALL,
            },
            [Constants.SETTINGS_EMOJI_FORMAT_KEY]: {
                type: 'string',
                default: Constants.SETTINGS_EMOJI_FORMAT_MARKDOWN,
            },
            [Constants.SETTINGS_SIGN_COMMIT_KEY]: {
                type: 'boolean',
                default: Constants.SETTINGS_SIGN_COMMIT,
            },
            [Constants.SETTINGS_ENABLE_UDACITY_STYLE_COMMIT_KEY]: {
                type: 'boolean',
                default: Constants.SETTINGS_ENABLE_UDACITY_STYLE_COMMIT,
            },
        };
        this.conf = new Conf();
        console.log(this.conf.store);
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
    public getIsUdacityStyleCommit(): boolean {
        return this.conf.get(Constants.SETTINGS_ENABLE_UDACITY_STYLE_COMMIT_KEY);
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
    public setUdacityStyleCommit(udacityStyleCommit: boolean): void {
        this.conf.set(Constants.SETTINGS_ENABLE_UDACITY_STYLE_COMMIT_KEY, udacityStyleCommit);
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
