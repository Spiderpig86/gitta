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
const Inquirer = require("inquirer");
const logger_1 = require("../utils/logger");
/**
 * Abstract class for implementing prompters.
 *
 * @export
 * @abstract
 * @class Prompter
 */
class Prompter {
    constructor(prompterArgs) {
        this.config = prompterArgs.config;
        this.emojiService = prompterArgs.emojiService;
        this.prefixService = prompterArgs.prefixService;
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prompts = yield this.getPrompts();
                const callback = yield this.getCallback();
                return Inquirer.prompt(prompts).then(callback);
            }
            catch (e) {
                logger_1.Logger.log(`Error occurred during prompting: ${e}`, logger_1.LogSeverity.ERROR);
                return null;
            }
        });
    }
}
exports.Prompter = Prompter;
