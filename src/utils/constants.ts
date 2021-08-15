export default {

    // App Constants
    APP_NAME: 'gittr',
    APP_VERSION: '0.0.1',
    
    // Logging Settings
    LOG_SEVERITY: 0,

    // Settings Keys
    SETTINGS_ADD_ALL_KEY: 'SETTINGS_ADD_ALL',
    SETTINGS_EMOJI_FORMAT_KEY: 'SETTINGS_EMOJI_FORMAT',
    SETTINGS_SIGN_COMMIT_KEY: 'SETTINGS_SIGN_COMMIT',
    SETTINGS_ENABLE_UDACITY_STYLE_COMMIT_KEY: 'SETTINGS_ENABLE_UDACITY_STYLE_COMMIT',

    // Setings Values
    SETTINGS_EMOJI_FORMAT_UNICODE: 'EMOJI_UNICODE',
    SETTINGS_EMOJI_FORMAT_MARKDOWN: 'EMOJI_MARKDOWN',

    // Settings Defaults
    SETTINGS_ADD_ALL: true,
    SETTINGS_EMOJI_FORMAT: this.SETTINGS_EMOJI_FORMAT_MARKDOWN,
    SETTINGS_SIGN_COMMIT: false,
    SETTINGS_ENABLE_UDACITY_STYLE_COMMIT: true,

    // Search Prompt
    SEARCH_KEY: 'SEARCH',
    SEARCH_PROMPT: 'Search for emoji: ',
}

export const Commands = {
    COMMIT: `commit`,
    RECONFIG: `reconfig`,
    LIST: `list`,
    SEARCH: `search`,
    ABOUT: `about`,
    VERSION: `version`,
}