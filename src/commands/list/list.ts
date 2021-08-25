import { EmojiItemModel, EmojiModel, PrefixItemModel, PrefixModel } from '../../models';
import { EmojiService, PrefixService } from '../../services';
import Constants from '../../utils/constants';
import { toEmojiItemConsoleOutput, toList, toPrefixItemConsoleOutput } from '../../utils/functions';
import { Logger, LogSeverity } from '../../utils/logger';

export const list = async (dataType: string, emojiService: EmojiService, prefixService: PrefixService) => {
    switch (dataType) {
        case Constants.LIST_EMOJI:
            const emojiModel = await emojiService.get();
            return toList<EmojiModel, EmojiItemModel>(emojiModel).forEach((emojiItemModel) =>
                console.log(toEmojiItemConsoleOutput(emojiItemModel))
            );
        case Constants.LIST_PREFIX:
            const prefixModel = await prefixService.get();
            return toList<PrefixModel, PrefixItemModel>(prefixModel).forEach((prefixItemModel) =>
                console.log(toPrefixItemConsoleOutput(prefixItemModel))
            );
        default:
            Logger.log(`Invalid choice given.`, LogSeverity.ERROR);
    }
};
