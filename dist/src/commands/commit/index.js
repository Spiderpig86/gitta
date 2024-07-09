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
const chalk_1 = require("chalk");
const execa = require("execa");
const constants_1 = require("../../utils/constants");
const functions_1 = require("../../utils/functions");
const prompts_1 = require("../prompts");
class CommitPrompter extends prompts_1.Prompter {
    getPrompts() {
        return __awaiter(this, void 0, void 0, function* () {
            const emojiModel = yield this.emojiService.get();
            return [
                {
                    name: constants_1.default.COMMIT_SELECT_EMOJI_KEY,
                    message: constants_1.default.COMMIT_SELECT_EMOJI_PROMPT,
                    type: 'autocomplete',
                    source: (answersSoFar, input) => {
                        return Promise.resolve(functions_1.toList(emojiModel)
                            .filter((emoji) => {
                            const emojiName = `${emoji.name}${emoji.description}`.toLowerCase();
                            return !input || emojiName.indexOf(input.toLowerCase()) !== -1;
                        })
                            .map((emoji) => {
                            return {
                                name: functions_1.toEmojiItemConsoleOutput(emoji),
                                value: emoji,
                            };
                        }));
                    },
                },
                ...(this.config.getIsConventionalCommits()
                    ? [
                        {
                            name: constants_1.default.COMMIT_SET_SCOPE_KEY,
                            message: constants_1.default.COMMIT_SET_SCOPE_PROMPT,
                            type: 'input',
                        },
                    ]
                    : []),
                {
                    name: constants_1.default.COMMIT_SET_TITLE_KEY,
                    message: constants_1.default.COMMIT_SET_TITLE_PROMPT,
                    type: 'input',
                },
                {
                    name: constants_1.default.COMMIT_SET_MESSAGE_KEY,
                    message: constants_1.default.COMMIT_SET_MESSAGE_PROMPT,
                    type: 'input',
                },
            ];
        });
    }
    getCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            return (answers) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const emojiModel = answers[constants_1.default.COMMIT_SELECT_EMOJI_KEY];
                    const emoji = this.config.getEmojiFormat() === constants_1.default.SETTINGS_EMOJI_FORMAT_MARKDOWN
                        ? emojiModel.code
                        : emojiModel.emoji;
                    let formattedScope = ``;
                    if (this.config.getIsConventionalCommits()) {
                        const scope = answers[constants_1.default.COMMIT_SET_SCOPE_KEY];
                        if (scope) {
                            formattedScope = `${emojiModel.type}(${answers[constants_1.default.COMMIT_SET_SCOPE_KEY]}): `;
                        }
                        else {
                            formattedScope = `${emojiModel.type}: `;
                        }
                    }
                    const isSigned = this.config.getSignCommit() ? [`-S`] : [];
                    const title = `${emoji} ${formattedScope}${answers[constants_1.default.COMMIT_SET_TITLE_KEY]}`;
                    const message = answers[constants_1.default.COMMIT_SET_MESSAGE_KEY]
                        ? [`-m`, answers[constants_1.default.COMMIT_SET_MESSAGE_KEY]]
                        : [];
                    if (this.config.getAddAll()) {
                        yield execa(`git`, [`add`, `.`]);
                    }
                    const commitFlags = [`commit`, ...isSigned, `-m`, title, ...message];
                    const { stdout } = yield execa(`git`, commitFlags);
                    console.log(stdout);
                }
                catch (e) {
                    console.error(chalk_1.default.red(`Something went wrong while committing...`, e));
                }
            });
        });
    }
}
exports.CommitPrompter = CommitPrompter;
