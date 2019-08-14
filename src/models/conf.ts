/**
 * Interface representing model of settings.
 *
 * @export
 * @interface ConfModel
 */
export default interface ConfModel {
    emojiFormat: {
        type: string,
        default: any
    },
    gitAddAll: {
        type: string,
        default: any
    }
}