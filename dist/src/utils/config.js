"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Conf = require("conf");
const constants_1 = require("./constants");
/**
 * Configuration manager for Gitta
 *
 * @export
 * @class Config
 */
class Config {
    constructor() {
        const schema = {
            [constants_1.default.SETTINGS_ADD_ALL_KEY]: {
                type: 'boolean',
                default: constants_1.default.SETTINGS_DEFAULT_ADD_ALL,
            },
            [constants_1.default.SETTINGS_EMOJI_FORMAT_KEY]: {
                type: 'string',
                default: constants_1.default.SETTINGS_EMOJI_FORMAT_MARKDOWN,
            },
            [constants_1.default.SETTINGS_SIGN_COMMIT_KEY]: {
                type: 'boolean',
                default: constants_1.default.SETTINGS_DEFAULT_SIGN_COMMIT,
            },
            [constants_1.default.SETTINGS_ENABLE_CONVENTIONAL_COMMITS_STANDARD_KEY]: {
                type: 'boolean',
                default: constants_1.default.SETTINGS_DEFAULT_ENABLE_CONVENTIONAL_COMMITS,
            },
            [constants_1.default.SETTINGS_UPDATE_EMOJIS_URL_KEY]: {
                // TODO: Validate proper URL with json
                type: 'string',
                default: constants_1.default.SETTINGS_DEFAULT_EMOJI_UPDATE_URL,
            },
            [constants_1.default.SETTINGS_UPDATE_PREFIX_URL_KEY]: {
                // TODO: Validate proper URL with json
                type: 'string',
                default: constants_1.default.SETTINGS_DEFAULT_PREFFIX_UPDATE_URL,
            },
        };
        this.conf = new Conf({
            projectName: constants_1.default.APP_NAME,
        });
        if (this.conf.store === undefined) {
            this.conf.set(schema);
        }
    }
    getAddAll() {
        return this.conf.get(constants_1.default.SETTINGS_ADD_ALL_KEY);
    }
    getEmojiFormat() {
        return this.conf.get(constants_1.default.SETTINGS_EMOJI_FORMAT_KEY);
    }
    getSignCommit() {
        return this.conf.get(constants_1.default.SETTINGS_SIGN_COMMIT_KEY);
    }
    getIsConventionalCommits() {
        return this.conf.get(constants_1.default.SETTINGS_ENABLE_CONVENTIONAL_COMMITS_STANDARD_KEY);
    }
    getEmojiUpdateUrl() {
        return this.conf.get(constants_1.default.SETTINGS_UPDATE_EMOJIS_URL_KEY);
    }
    getPrefixUpdateUrl() {
        return this.conf.get(constants_1.default.SETTINGS_UPDATE_PREFIX_URL_KEY);
    }
    setAddAll(addAll) {
        this.conf.set(constants_1.default.SETTINGS_ADD_ALL_KEY, addAll);
    }
    setEmojiFormat(emojiFormat) {
        this.conf.set(constants_1.default.SETTINGS_EMOJI_FORMAT_KEY, emojiFormat);
    }
    setSignCommit(signCommit) {
        this.conf.set(constants_1.default.SETTINGS_SIGN_COMMIT_KEY, signCommit);
    }
    setConventionalCommits(useConventionalCommits) {
        this.conf.set(constants_1.default.SETTINGS_ENABLE_CONVENTIONAL_COMMITS_STANDARD_KEY, useConventionalCommits);
    }
    setEmojiUpdateUrl(emojiUpdateUrl) {
        this.conf.set(constants_1.default.SETTINGS_UPDATE_EMOJIS_URL_KEY, emojiUpdateUrl);
    }
    setPrefixUpdateUrl(prefixUpdateUrl) {
        this.conf.set(constants_1.default.SETTINGS_UPDATE_PREFIX_URL_KEY, prefixUpdateUrl);
    }
    /**
     * Get an object containing all of the configuration values.
     *
     * @returns {{ [s: string]: any }} - the object containing all of the configuration key and values.
     * @memberof Config
     */
    getConfigValues() {
        return this.conf.store;
    }
}
exports.Config = Config;
