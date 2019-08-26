export interface EmojiItemModel {

    emoji: string;
    code: string;
    type: string;
    name: string;

}

export interface EmojiModel {

    emojis: EmojiItemModel[];

}