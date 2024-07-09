"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const chalk_1 = require("chalk");
exports.isDevelopment = () => {
    return process.env.GITTA_DEV !== undefined;
};
exports.getCacheDirectory = () => {
    if (exports.isDevelopment()) {
        return Path.join(__dirname, '..', '..', 'configuration');
    }
    else {
        const home = process.env.HOME || process.env.USERPROFILE;
        return Path.join(home, '.gitta');
    }
};
exports.toList = (model) => {
    if (!model) {
        return [];
    }
    let result = [];
    Object.keys(model).forEach((key) => {
        result = result.concat(model[key]);
    });
    return result;
};
exports.toEmojiItemConsoleOutput = (emojiItemModel) => {
    return `${emojiItemModel.emoji} ${chalk_1.default.blue(`:${emojiItemModel.name}:`)} (${emojiItemModel.type}) - ${emojiItemModel.description}`;
};
exports.toPrefixItemConsoleOutput = (prefixItemModel) => {
    return `${chalk_1.default.blue(`${prefixItemModel.prefix}`)} (${prefixItemModel.name}) - ${prefixItemModel.description}`;
};
