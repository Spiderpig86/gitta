import * as Path from 'path';

import { EmojiItemModel, EmojiModel } from '../models';
import { Config } from '../utils/config';
import { CachedService } from './cached-service';

/**
 * Class for managing and retrieving emojis corresponding to each type of commit.
 *
 * @export
 * @class EmojiService
 */
export class EmojiService extends CachedService<EmojiItemModel, EmojiModel> {
    constructor(config: Config) {
        super(config);
    }

    protected getEndpoint(): string {
        return this.config.getEmojiUpdateUrl();
    }

    protected getCachePath(): string {
        if (process.env.DEV) {
            return './src/data/emojis.json';
        } else {
            const home = process.env.HOME || process.env.USERPROFILE;
            return Path.join(home, '.gittr', 'emoji.json');
        }
    }

    protected plural(): string {
        return 'emojis';
    }
}
