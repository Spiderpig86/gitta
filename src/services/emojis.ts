import * as Fs from 'fs';
import * as Path from 'path';
import * as PathExists from 'path-exists';
import Axios from 'axios';

import { EmojiItemModel, EmojiModel } from '../models';
import { Config } from '../utils/config';
import { Logger, LogSeverity } from '../utils/logger';
import ora = require('ora');

/**
 * Class for managing and retrieving emojis corresponding to each type of commit.
 *
 * @export
 * @class EmojiService
 */
export class EmojiService {
    private emoji: EmojiModel;
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * Fetches emojis remotely or from cache depending on if it is loaded already.
     *
     * @returns {Promise<EmojiModel>} - a JSON object containing all Github emojis that can be used.
     * @memberof CommitEmoji
     */
    public async getEmojiModel(forceUpdate: boolean = false, overwriteCustom: boolean = false): Promise<EmojiModel> {
        if (this.emoji) {
            return this.emoji;
        }

        const cachePath: string = this.getCachePath();
        if (forceUpdate || !this.isCacheAvailable()) {
            let emojiJson: EmojiModel = await this.getPublicEmojis();
            this.emoji = emojiJson;


            this.createCache(cachePath, emojiJson);
            return emojiJson;
        }
        const cache: EmojiModel = await this.getCachedEmojis(cachePath);
        this.emoji = cache;
        return cache;
    }

    /**
     * Fetches emojis from public server.
     *
     * @private
     * @returns {Promise<EmojiModel>} - promise contianing JSON object of emojis.
     * @memberof CommitEmoji
     */
    private async getPublicEmojis(): Promise<EmojiModel> {
        const loader = ora(`Updating emojis...`).start();

        try {
            const response = await Axios.get<EmojiModel>(this.config.getEmojiUpdateUrl());
            loader.succeed(`✅ Succeeded fetching emojis!`)
            return response.data;
        } catch (e) {
            Logger.log(
                `Unable to fetch emojis from url: ${this.config.getEmojiUpdateUrl()}. Please reconfigure it to the correct one. ${e}`,
                LogSeverity.ERROR
            );
            loader.fail(`❌ Failed fetching emojis.`)
            return null;
        }
    }

    /**
     * Returns file path of cached emoji data.
     *
     * @private
     * @param {string} path = The file path of commit emojis.
     * @returns {Promise<any>} - promise containing file contents of cached emojis.
     * @memberof CommitEmoji
     */
    private getCachedEmojis(path: string): Promise<any> {
        if (!this.isCacheAvailable()) {
            return Promise.reject();
        }
        return Promise.resolve(JSON.parse(Fs.readFileSync(path).toString()));
    }

    /**
     * Checks if emoji cache has been written.
     *
     * @private
     * @returns {boolean}
     * @memberof CommitEmoji
     */
    private isCacheAvailable(): boolean {
        return PathExists.sync(this.getCachePath());
    }

    /**
     * Returns the path of cached emojis.
     *
     * @private
     * @returns {string} - path to where the cache is located.
     * @memberof CommitEmoji
     */
    private getCachePath(): string {
        // return Path.join(home, '.gittr', 'emoji.json');
        if (process.env.DEV) {
            return './src/data/emojis.json';
        } else {
            const home = process.env.HOME || process.env.USERPROFILE;
            return Path.join(home, '.gittr', 'emoji.json');
        }
    }

    /**
     * Caches the emojis fetched from the server.
     *
     * @private
     * @param {string} path - The path of the emoji cache.
     * @param {*} data - The JSON data corresponding to emoji entries.
     * @memberof CommitEmoji
     */
    private createCache(path: string, data: any): void {
        const cacheDir: string = Path.dirname(path);
        if (data) {
            if (!PathExists.sync(cacheDir)) {
                Fs.mkdirSync(cacheDir);
            }
            Fs.writeFileSync(path, JSON.stringify(data, null, 4));
        }
    }
}
