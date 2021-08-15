/**
 * Interface representing JSON object containing Udacity and custom prefixes.
 * 
 * @export
 * @interface PrefixModel
 */
export interface PrefixModel {

    prefixes: PrefixItemModel[];
    custom: PrefixItemModel[];

}

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