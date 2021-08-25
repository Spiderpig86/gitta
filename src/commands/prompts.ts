import * as Inquirer from 'inquirer';

import { Config } from '../utils/config';
import { EmojiService, PrefixService } from '../../src/services';
import { Logger, LogSeverity } from '../utils/logger';

export interface PrompterArgs {
    config: Config;
    emojiService: EmojiService;
    prefixService: PrefixService;
}

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
    protected prefixService: PrefixService;

    constructor(prompterArgs: PrompterArgs) {
        this.config = prompterArgs.config;
        this.emojiService = prompterArgs.emojiService;
        this.prefixService = prompterArgs.prefixService;
    }

    public async prompt(): Promise<any> {
        try {
            const prompts = await this.getPrompts();
            const callback = await this.getCallback();
            return Inquirer.prompt(prompts).then(callback);
        } catch (e) {
            Logger.log(`Error occurred during prompting: ${e}`, LogSeverity.ERROR);
            return null;
        }
    }

    protected abstract async getPrompts(): Promise<any>;
    protected abstract async getCallback(): Promise<(answers: any) => void>;
}
