import { Data } from "./data";

/**
 * Interface representing individual prefix objects.
 * 
 * @export
 * @interface PrefixItemModel
 */
export interface PrefixItemModel {

    name: string;
    description: string;
    prefix: string;

}

/**
 * Interface representing JSON object containing Udacity and custom prefixes.
 * 
 * @export
 * @interface PrefixModel
 */
 export interface PrefixModel extends Data<PrefixItemModel> {

    default: PrefixItemModel[];
    custom: PrefixItemModel[];

}