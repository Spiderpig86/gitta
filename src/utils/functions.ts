import * as Path from 'path';

import chalk from 'chalk';
import { EmojiItemModel, PrefixItemModel } from '../models';

export const isDevelopment = (): boolean => {
    return process.env.DEV !== undefined;
};

export const getCacheDirectory = (): string => {
    if (isDevelopment()) {
        return Path.join(__dirname, '..', '..', 'configuration');
    } else {
        const home = process.env.HOME || process.env.USERPROFILE;
        return Path.join(home, '.gittr');
    }
};

export const toList = <T, E>(model: T): E[] => {
    if (!model) {
        return [];
    }

    let result: E[] = [];
    Object.keys(model).forEach((key) => {
        result = result.concat(model[key]);
    });
    return result;
};

export const toEmojiItemConsoleOutput = (emojiItemModel: EmojiItemModel): string => {
    return `${emojiItemModel.emoji} ${chalk.blue(`:${emojiItemModel.name}:`)} (${emojiItemModel.type}) - ${
        emojiItemModel.description
    }`;
};

export const toPrefixItemConsoleOutput = (prefixItemModel: PrefixItemModel): string => {
    return `${chalk.blue(`${prefixItemModel.prefix}`)} (${prefixItemModel.name}) - ${prefixItemModel.description}`;
};
