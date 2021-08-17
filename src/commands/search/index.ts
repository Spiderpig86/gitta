import chalk from 'chalk';

import { EmojiItemModel, EmojiModel } from '../../models';
import Constants from '../../utils/constants';
import { toEmojiItemConsoleOutput, toList } from '../../utils/functions';
import { Prompter } from '../prompts';

export class SearchPrompter extends Prompter {
    protected async getPrompts() {
        const emojiModel = await this.emojiService.getEmojiModel();

        return [
            {
                name: Constants.SEARCH_KEY,
                message: Constants.SEARCH_PROMPT,
                type: 'autocomplete',
                source: (answersSoFar: any[], input: string) => {
                    return Promise.resolve(
                        toList<EmojiModel, EmojiItemModel>(emojiModel)
                            .filter((emoji) => {
                                const emojiName = `${emoji.name}${emoji.description}`.toLowerCase();
                                return !input || emojiName.indexOf(input.toLowerCase()) !== -1;
                            })
                            .map((emoji) => {
                                return {
                                    name: toEmojiItemConsoleOutput(emoji),
                                    value:
                                        this.config.getEmojiFormat() === Constants.SETTINGS_EMOJI_FORMAT_MARKDOWN
                                            ? emoji.emoji
                                            : emoji.code,
                                };
                            })
                    );
                },
            },
        ];
    }

    protected async getCallback() {
        return (answers: any) => {
            console.log(`Emoji: ${answers[Constants.SEARCH_KEY]}`);
        };
    }
}
