import Constants from '../../utils/constants';
import { Prompter } from '../prompts';

/**
 * Prompter designed for setting user preferences in the configuration setup stage.
 *
 * @export
 * @class ConfigPrompter
 * @extends {Prompter}
 */
export class ConfigPrompter extends Prompter {
    protected async getPrompts() {
        return [
            {
                name: Constants.SETTINGS_ADD_ALL_KEY,
                message: 'Automatically add all files to your commit.',
                type: 'confirm',
            },
            {
                name: Constants.SETTINGS_EMOJI_FORMAT_KEY,
                message: 'Choose how your emojis should be displayed.',
                type: 'list',
                choices: [
                    {
                        name: ':tada:',
                        value: 'EMOJI_MARKDOWN',
                    },
                    {
                        name: '🎉',
                        value: 'EMOJI_UNICODE',
                    },
                ],
            },
            {
                name: Constants.SETTINGS_SIGN_COMMIT_KEY,
                message: 'Set if commits should be signed by default.',
                type: 'confirm',
            },
            {
                name: Constants.SETTINGS_ENABLE_CONVENTIONAL_COMMITS_STANDARD_KEY,
                message: 'Set if Conventional Commits standard should be used (specify files affected by commit).',
                type: 'confirm',
            },
            {
                name: Constants.SETTINGS_UPDATE_EMOJIS_URL_KEY,
                message: 'Set Gitta emoji refresh url.',
                type: 'input',
                default: Constants.SETTINGS_DEFAULT_EMOJI_UPDATE_URL,
            },
            {
                name: Constants.SETTINGS_UPDATE_PREFIX_URL_KEY,
                message: 'Set Gitta prefix refresh url.',
                type: 'input',
                default: Constants.SETTINGS_DEFAULT_PREFFIX_UPDATE_URL,
            },
        ];
    }

    protected async getCallback() {
        return (answers: any) => {
            this.config.setAddAll(answers[Constants.SETTINGS_ADD_ALL_KEY]);
            this.config.setEmojiFormat(answers[Constants.SETTINGS_EMOJI_FORMAT_KEY]);
            this.config.setSignCommit(answers[Constants.SETTINGS_SIGN_COMMIT_KEY]);
            this.config.setConventionalCommits(answers[Constants.SETTINGS_ENABLE_CONVENTIONAL_COMMITS_STANDARD_KEY]);
            this.config.setEmojiUpdateUrl(answers[Constants.SETTINGS_UPDATE_EMOJIS_URL_KEY]);
            this.config.setPrefixUpdateUrl(answers[Constants.SETTINGS_UPDATE_PREFIX_URL_KEY]);
        };
    }
}
