import chalk from "chalk";
import { EmojiItemModel } from "../models";

export const toList = <T, E>(model: T): E[] => {
    let result: E[] = [];
    Object.keys(model).forEach(key => {
        result = result.concat(model[key]);
    });
    return result;
}

export const toEmojiItemConsoleOutput = (emojiItemModel: EmojiItemModel): string => {
    return `${emojiItemModel.emoji} ${chalk.blue(`:${emojiItemModel.name}:`)} (${emojiItemModel.type}) - ${
        emojiItemModel.description
    }`;
}