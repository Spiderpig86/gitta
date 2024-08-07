"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = {
    // App Constants
    APP_NAME: require(path.join(__dirname, '..', '..', 'package.json')).name,
    APP_VERSION: require(path.join(__dirname, '..', '..', 'package.json')).version,
    // Logging Settings
    LOG_SEVERITY: 0,
    // Settings Keys
    SETTINGS_ADD_ALL_KEY: 'SETTINGS_ADD_ALL',
    SETTINGS_EMOJI_FORMAT_KEY: 'SETTINGS_EMOJI_FORMAT',
    SETTINGS_SIGN_COMMIT_KEY: 'SETTINGS_SIGN_COMMIT',
    SETTINGS_ENABLE_CONVENTIONAL_COMMITS_STANDARD_KEY: 'SETTINGS_ENABLE_CONVENTIONAL_COMMITS_STANDARD_KEY',
    SETTINGS_UPDATE_EMOJIS_URL_KEY: `SETTINGS_UPDATE_EMOJIS_URL_KEY`,
    SETTINGS_UPDATE_PREFIX_URL_KEY: `SETTINGS_UPDATE_PREFIX_URL_KEY`,
    // Settings Values
    SETTINGS_EMOJI_FORMAT_UNICODE: 'EMOJI_UNICODE',
    SETTINGS_EMOJI_FORMAT_MARKDOWN: 'EMOJI_MARKDOWN',
    // Settings Defaults
    SETTINGS_DEFAULT_ADD_ALL: true,
    SETTINGS_DEFAULT_SIGN_COMMIT: false,
    SETTINGS_DEFAULT_ENABLE_CONVENTIONAL_COMMITS: true,
    SETTINGS_DEFAULT_EMOJI_UPDATE_URL: `https://raw.githubusercontent.com/Spiderpig86/gitta/master/configuration/emojis.json`,
    SETTINGS_DEFAULT_PREFFIX_UPDATE_URL: `https://raw.githubusercontent.com/Spiderpig86/gitta/master/configuration/prefixes.json`,
    // Search Prompt
    SEARCH_KEY: 'SEARCH',
    SEARCH_PROMPT: 'Search for emoji: ',
    // Commit Prompt
    COMMIT_SELECT_EMOJI_KEY: `COMMIT_SELECT_EMOJI_KEY`,
    COMMIT_SELECT_EMOJI_PROMPT: `Select an emoji`,
    COMMIT_SET_SCOPE_KEY: `COMMIT_SET_SCOPE_KEY`,
    COMMIT_SET_SCOPE_PROMPT: `Specify file(s) updated`,
    COMMIT_SET_TITLE_KEY: `COMMIT_SET_TITLE_KEY`,
    COMMIT_SET_TITLE_PROMPT: `Set commit title`,
    COMMIT_SET_MESSAGE_KEY: `COMMIT_SET_MESSAGE_KEY`,
    COMMIT_SET_MESSAGE_PROMPT: `Set commit message (optional)`,
    // List Prompt
    LIST_CHOICE: `LIST_CHOICE`,
    // Edit Prompt
    EDIT_CHOICE: `EDIT_CHOICE`,
    // Data Types
    EMOJI: `EMOJI`,
    PREFIX: `PREFIX`,
};
exports.Commands = {
    COMMIT: `commit`,
    RECONFIG: `reconfig`,
    LIST: `list`,
    SEARCH: `search`,
    EDIT: `edit`,
    HELP: `help`,
    UPDATE: `update`,
    VERSION: `version`,
};
