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
const list_1 = require("./list");
class ListPrompter extends prompts_1.Prompter {
    getPrompts() {
        return __awaiter(this, void 0, void 0, function* () {
            return [
                {
                    name: constants_1.default.LIST_CHOICE,
                    message: 'What data do you want to list out?',
                    type: 'list',
                    choices: [
                        {
                            name: 'emojis',
                            value: constants_1.default.EMOJI,
                        },
                        {
                            name: 'prefixes',
                            value: constants_1.default.PREFIX,
                        },
                    ],
                },
            ];
        });
    }
    getCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            return (answers) => {
                list_1.list(answers[constants_1.default.LIST_CHOICE], this.emojiService, this.prefixService);
            };
        });
    }
}
exports.ListPrompter = ListPrompter;
