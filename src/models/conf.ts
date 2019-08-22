/**
 * Interface representing model of settings.
 *
 * @export
 * @interface ConfModel
 */
export default interface ConfModel {
    [s: string]: {
        type: string,
        default: any
    }
}