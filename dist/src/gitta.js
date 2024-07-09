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
const PromptConstructor = require("inquirer-autocomplete-prompt");
const open = require("open");
const config_1 = require("./utils/config");
const commands_1 = require("./commands");
const logger_1 = require("./utils/logger");
const constants_1 = require("./utils/constants");
const services_1 = require("./services");
const functions_1 = require("./utils/functions");
Inquirer.registerPrompt('autocomplete', PromptConstructor);
// TODO: Refactor so code is in isolated command dirs later
/**
 * Main class handling CLI functionality.
 *
 * @export
 * @class Gitta
 */
class Gitta {
    constructor() {
        this.config = new config_1.Config();
        this.setDefaultPreferences(this.config);
        this.emojiService = new services_1.EmojiService(this.config);
        this.prefixService = new services_1.PrefixService(this.config);
        this.prompterArgs = {
            config: this.config,
            emojiService: this.emojiService,
            prefixService: this.prefixService,
        };
    }
    commit() {
        logger_1.Logger.log(`commit called`, logger_1.LogSeverity.DEBUG);
        const commitPrompter = new commands_1.CommitPrompter(this.prompterArgs);
        commitPrompter.prompt();
    }
    reconfig() {
        logger_1.Logger.log(`reconfig called`, logger_1.LogSeverity.DEBUG);
        const configPrompter = new commands_1.ConfigPrompter(this.prompterArgs);
        configPrompter.prompt();
    }
    /**
     * Lists all default/custom emojis defined in Gitta.
     */
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.Logger.log(`list called`, logger_1.LogSeverity.DEBUG);
            const listPrompter = new commands_1.ListPrompter(this.prompterArgs);
            return listPrompter.prompt();
        });
    }
    search() {
        return __awaiter(this, void 0, void 0, function* () {
            const searchPrompter = new commands_1.SearchPrompter(this.prompterArgs);
            searchPrompter.prompt();
        });
    }
    edit() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Opening emoji/prefix directory...`);
            yield open(functions_1.getCacheDirectory());
        });
    }
    help(cli) {
        cli.showHelp();
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([this.emojiService.get(true), this.prefixService.get(true)]);
        });
    }
    version() {
        logger_1.Logger.log(`version called`, logger_1.LogSeverity.DEBUG);
        console.log(`${constants_1.default.APP_NAME} - ${constants_1.default.APP_VERSION}`);
    }
    // PRIVATE METHODS
    /**
     * Handles setting default preferences for Gitta on initialization.
     *
     * @private
     * @param {Config} config - the config object used in the application.
     * @memberof Gitta
     */
    setDefaultPreferences(config) {
        if (config.getAddAll() === undefined) {
            config.setAddAll(true);
        }
        if (config.getEmojiFormat() === undefined) {
            config.setEmojiFormat(constants_1.default.SETTINGS_EMOJI_FORMAT_MARKDOWN);
        }
        if (config.getSignCommit() === undefined) {
            config.setSignCommit(false);
        }
        if (config.getIsConventionalCommits() === undefined) {
            config.setConventionalCommits(true);
        }
    }
}
exports.default = Gitta;
