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
const logger_1 = require("../../utils/logger");
exports.list = (dataType, emojiService, prefixService) => __awaiter(this, void 0, void 0, function* () {
    switch (dataType) {
        case constants_1.default.EMOJI:
            const emojiModel = yield emojiService.get();
            return functions_1.toList(emojiModel).forEach((emojiItemModel) => console.log(functions_1.toEmojiItemConsoleOutput(emojiItemModel)));
        case constants_1.default.PREFIX:
            const prefixModel = yield prefixService.get();
            return functions_1.toList(prefixModel).forEach((prefixItemModel) => console.log(functions_1.toPrefixItemConsoleOutput(prefixItemModel)));
        default:
            logger_1.Logger.log(`Invalid choice given.`, logger_1.LogSeverity.ERROR);
    }
});
