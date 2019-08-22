import Conf from 'conf';
import ConfModel from '../models/conf';
import Constants from './constants';
import { sign } from 'crypto';

/**
 * Configuration manager for Gittr
 *
 * @export
 * @class Config
 */
export default class Config {

    private conf: Conf<any>;

    constructor() {
        const schema: ConfModel = {
            'SETTINGS_ADD_ALL': {
                type: 'boolean',
                default: Constants.SETTINGS_ADD_ALL
            },
            'SETTINGS_EMOJI_FORMAT': {
                type: 'string',
                default: Constants.SETTINGS_EMOJI_FORMAT_MARKDOWN
            },
            'SETTINGS_SIGN_COMMIT': {
                type: 'boolean',
                default: Constants.SETTINGS_SIGN_COMMIT
            },
            'SETTINGS_ENABLE_UDACITY_STYLE_COMMIT': {
                type: 'boolean',
                default: Constants.SETTINGS_ENABLE_UDACITY_STYLE_COMMIT
            }
        }
        this.conf = new Conf();
        this.conf.set(schema);
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
    public getUdacityStyleCommit(): boolean {
        return this.conf.get(Constants.SETTINGS_ENABLE_UDACITY_STYLE_COMMIT_KEY);
    }

    public setAddAll(addAll: boolean) {
        this.conf.set(Constants.SETTINGS_ADD_ALL_KEY, addAll);
    }
    public setEmojiFormat(emojiFormat: boolean) {
        this.conf.set(Constants.SETTINGS_EMOJI_FORMAT_KEY, emojiFormat);
    }
    public setSignCommit(signCommit: boolean) {
        this.conf.set(Constants.SETTINGS_SIGN_COMMIT_KEY, signCommit);
    }
    public setUdacityStyleCommit(udacityStyleCommit: boolean) {
        this.conf.set(Constants.SETTINGS_ENABLE_UDACITY_STYLE_COMMIT_KEY, udacityStyleCommit);
    }

}