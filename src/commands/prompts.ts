import * as Inquirer from 'inquirer';

import { Config } from '../utils/config';
import { EmojiService } from '../../src/services';

/**
 * Abstract class for implementing prompters.
 *
 * @export
 * @abstract
 * @class Prompter
 */
export abstract class Prompter {
    protected config: Config;
    protected emojiService: EmojiService;

    constructor(config: Config, emojiService: EmojiService) {
        this.config = config;
        this.emojiService = emojiService;
    }

    public async prompt(): Promise<any> {
        const prompts = await this.getPrompts();
        const callback = await this.getCallback();
        return Inquirer.prompt(prompts).then(callback);
    }

    protected abstract async getPrompts(): Promise<any>;
    protected abstract async getCallback(): Promise<(answers: any) => void>;
}
