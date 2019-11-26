export interface EmojiItemModel {

    emoji: string;
    code: string;
    type: string;
    name: string;
    description: string;

}

export interface EmojiModel {

    emojis: EmojiItemModel[];

}