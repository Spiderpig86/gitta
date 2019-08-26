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

    public async getEmojis(): Promise<EmojiModel> {

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

    private async getPublicEmojis(): Promise<EmojiModel> {
        try {
            const response: any = this.api.request({
                method: 'GET',
                url: '/src/data/emojis.json'
            });
            return response.data.emojis;
        } catch (e) {

        }
    }

    private getCachedEmojis(path: string): Promise<any> {
        if (!this.isCacheAvailable()) {
            return Promise.reject();
        }
        return Promise.resolve(JSON.parse(Fs.readFileSync(path).toString()));
    }

    private isCacheAvailable(): boolean {
        return PathExists.sync(this.getCachePath());
    }

    private getCachePath(): string {
        const home = process.env.HOME || process.env.USERPROFILE;
        return Path.join(home, '.gittr', 'emoji.json');
    }

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