import chalk from 'chalk';
import * as execa from 'execa';

import { EmojiItemModel, EmojiModel } from '../../models';
import Constants from '../../utils/constants';
import { toList } from '../../utils/functions';
import { Prompter } from '../prompts';

export class CommitPrompter extends Prompter {
    protected async getPrompts() {
        const emojiModel = await this.emojiService.get();

        return [
            {
                name: Constants.COMMIT_SELECT_EMOJI_KEY,
                message: Constants.COMMIT_SELECT_EMOJI_PROMPT,
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
                                    name: `${emoji.emoji} ${chalk.blue(`:${emoji.name}:`)} - ${emoji.description}`,
                                    value: emoji,
                                };
                            })
                    );
                },
            },
            ...(this.config.getIsUdacityStyleCommit()
                ? [
                      {
                          name: Constants.COMMIT_SET_SCOPE_KEY,
                          message: Constants.COMMIT_SET_SCOPE_PROMPT,
                          type: 'input',
                      },
                  ]
                : []),
            {
                name: Constants.COMMIT_SET_TITLE_KEY,
                message: Constants.COMMIT_SET_TITLE_PROMPT,
                type: 'input',
            },
            {
                name: Constants.COMMIT_SET_MESSAGE_KEY,
                message: Constants.COMMIT_SET_MESSAGE_PROMPT,
                type: 'input',
            },
        ];
    }

    protected async getCallback() {
        return async (answers: any) => {
            try {
                const emojiModel: EmojiItemModel = answers[Constants.COMMIT_SELECT_EMOJI_KEY];
                const emoji =
                    this.config.getEmojiFormat() === Constants.SETTINGS_EMOJI_FORMAT_MARKDOWN
                        ? emojiModel.code
                        : emojiModel.emoji;

                let formattedScope = ``;
                if (this.config.getIsUdacityStyleCommit()) {
                    const scope = answers[Constants.COMMIT_SET_SCOPE_KEY];
                    if (scope) {
                        formattedScope = `${emojiModel.type}(${answers[Constants.COMMIT_SET_SCOPE_KEY]}): `;
                    } else {
                        formattedScope = `${emojiModel.type}: `;
                    }
                }

                const isSigned = this.config.getSignCommit() ? [`-S`] : [];
                const title = `${emoji} ${formattedScope}${answers[Constants.COMMIT_SET_TITLE_KEY]}`;
                const message = answers[Constants.COMMIT_SET_MESSAGE_KEY]
                    ? [`-m`, answers[Constants.COMMIT_SET_MESSAGE_KEY]]
                    : [];

                if (this.config.getAddAll()) {
                    await execa(`git`, [`add`, `.`]);
                }

                const commitFlags = [`commit`, ...isSigned, `-m`, title, ...message];
                const { stdout } = await execa(`git`, commitFlags);

                console.log(stdout);
            } catch (e) {
                console.error(chalk.red(`Something went wrong while committing...`, e));
            }
        };
    }
}
