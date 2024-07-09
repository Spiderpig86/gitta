"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../utils/constants");
const prompts_1 = require("../prompts");
/**
 * Prompter designed for setting user preferences in the configuration setup stage.
 *
 * @export
 * @class ConfigPrompter
 * @extends {Prompter}
 */
class ConfigPrompter extends prompts_1.Prompter {
    getPrompts() {
        return __awaiter(this, void 0, void 0, function* () {
            return [
                {
                    name: constants_1.default.SETTINGS_ADD_ALL_KEY,
                    message: 'Automatically add all files to your commit.',
                    type: 'confirm',
                },
                {
                    name: constants_1.default.SETTINGS_EMOJI_FORMAT_KEY,
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
                    name: constants_1.default.SETTINGS_SIGN_COMMIT_KEY,
                    message: 'Set if commits should be signed by default.',
                    type: 'confirm',
                },
                {
                    name: constants_1.default.SETTINGS_ENABLE_CONVENTIONAL_COMMITS_STANDARD_KEY,
                    message: 'Set if Conventional Commits standard should be used (specify files affected by commit).',
                    type: 'confirm',
                },
                {
                    name: constants_1.default.SETTINGS_UPDATE_EMOJIS_URL_KEY,
                    message: 'Set Gitta emoji refresh url.',
                    type: 'input',
                    default: constants_1.default.SETTINGS_DEFAULT_EMOJI_UPDATE_URL,
                },
                {
                    name: constants_1.default.SETTINGS_UPDATE_PREFIX_URL_KEY,
                    message: 'Set Gitta prefix refresh url.',
                    type: 'input',
                    default: constants_1.default.SETTINGS_DEFAULT_PREFFIX_UPDATE_URL,
                },
            ];
        });
    }
    getCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            return (answers) => {
                this.config.setAddAll(answers[constants_1.default.SETTINGS_ADD_ALL_KEY]);
                this.config.setEmojiFormat(answers[constants_1.default.SETTINGS_EMOJI_FORMAT_KEY]);
                this.config.setSignCommit(answers[constants_1.default.SETTINGS_SIGN_COMMIT_KEY]);
                this.config.setConventionalCommits(answers[constants_1.default.SETTINGS_ENABLE_CONVENTIONAL_COMMITS_STANDARD_KEY]);
                this.config.setEmojiUpdateUrl(answers[constants_1.default.SETTINGS_UPDATE_EMOJIS_URL_KEY]);
                this.config.setPrefixUpdateUrl(answers[constants_1.default.SETTINGS_UPDATE_PREFIX_URL_KEY]);
            };
        });
    }
}
exports.ConfigPrompter = ConfigPrompter;
