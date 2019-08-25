/**
 * Interface representing model of settings.
 *
 * @export
 * @interface ConfModel
 */
export interface ConfModel {
    [s: string]: {
        type: string,
        default: any
    }
}