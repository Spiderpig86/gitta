import * as Fs from 'fs';
import * as Path from 'path';
import * as PathExists from 'path-exists';

import { EmojiModel } from "./models";

/**
 * Class for managing and retrieving emojis corresponding to each type of commit.
 * 
 * @export
 * @class CommitEmoji
 */
export default class CommitEmoji {

    private emoji: EmojiModel;
    private api: any;

    public CommitEmoji(api: any) {
        this.api = api;
    }

    /**
     * Fetches emojis remotely or from cache depending on if it is loaded already.
     * 
     * @returns {Promise<EmojiModel>} - a JSON object containing all Github emojis that can be used.
     * @memberof CommitEmoji
     */
    public async getEmojiModel(): Promise<EmojiModel> {

        if (this.emoji) {
            return this.emoji;
        }

        const cachePath: string = this.getCachePath();
        if (!this.isCacheAvailable()) {
            const emojiJson: EmojiModel = await (this.getPublicEmojis()) as EmojiModel;
            this.emoji = emojiJson;
            this.createCache(cachePath, emojiJson);
            return emojiJson;
        }
        const cache: EmojiModel = await (this.getCachedEmojis(cachePath)) as EmojiModel;
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
        try {
            const response: any = this.api.request({
                method: 'GET',
                url: '/src/data/emojis.json'
            });
            return response.data.emojis;
        } catch (e) {
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
        // const home = process.env.HOME || process.env.USERPROFILE;
        // return Path.join(home, '.gittr', 'emoji.json');
        return './src/data/emojis.json';
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
            Fs.writeFileSync(path, JSON.stringify(data));
        }
    }
}