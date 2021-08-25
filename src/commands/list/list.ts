import { EmojiItemModel, EmojiModel } from '../../models';
import { EmojiService } from '../../services';
import Constants from '../../utils/constants';
import { toEmojiItemConsoleOutput, toList } from '../../utils/functions';
import { Logger, LogSeverity } from '../../utils/logger';

export const list = async (dataType: string, emojiService: EmojiService) => {
    switch (dataType) {
        case Constants.LIST_EMOJI:
            const emojiModel = await emojiService.get();
            return toList<EmojiModel, EmojiItemModel>(emojiModel).forEach((emojiItemModel) =>
                console.log(toEmojiItemConsoleOutput(emojiItemModel))
            );
        case Constants.LIST_PREFIX:
        default:
            Logger.log(`Invalid choice given.`, LogSeverity.ERROR);
    }
};
