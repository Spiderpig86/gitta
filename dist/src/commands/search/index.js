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
const functions_1 = require("../../utils/functions");
const prompts_1 = require("../prompts");
class SearchPrompter extends prompts_1.Prompter {
    getPrompts() {
        return __awaiter(this, void 0, void 0, function* () {
            const emojiModel = yield this.emojiService.get();
            if (!emojiModel) {
                throw new Error('Unable to fetch emojis.');
            }
            return [
                {
                    name: constants_1.default.SEARCH_KEY,
                    message: constants_1.default.SEARCH_PROMPT,
                    type: 'autocomplete',
                    source: (answersSoFar, input) => {
                        return Promise.resolve(functions_1.toList(emojiModel)
                            .filter((emoji) => {
                            const emojiName = functions_1.toEmojiItemConsoleOutput(emoji);
                            return !input || emojiName.indexOf(input.toLowerCase()) !== -1;
                        })
                            .map((emoji) => {
                            return {
                                name: functions_1.toEmojiItemConsoleOutput(emoji),
                                value: this.config.getEmojiFormat() === constants_1.default.SETTINGS_EMOJI_FORMAT_MARKDOWN
                                    ? emoji.emoji
                                    : emoji.code,
                            };
                        }));
                    },
                },
            ];
        });
    }
    getCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            return (answers) => {
                console.log(`Emoji: ${answers[constants_1.default.SEARCH_KEY]}`);
            };
        });
    }
}
exports.SearchPrompter = SearchPrompter;
