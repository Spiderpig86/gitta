import { Data } from "./data";

export interface EmojiItemModel {

    emoji: string;
    code: string;
    type: string;
    name: string;
    description: string;

}

export interface EmojiModel extends Data<EmojiItemModel> {

    default: EmojiItemModel[];
    custom: EmojiItemModel[];
    
}
