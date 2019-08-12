import Conf from 'conf';
import Constants from './constants';

/**
 * Configuration manager for Gittr
 *
 * @export
 * @class Config
 */
export default class Config {

    
    private conf: Conf<any>;

    constructor() {
        const schema = {
            emojiFormat: {
                type: 'string',
                default: Constants.SETTINGS_EMOJI_FORMAT_MARKDOWN
            },
            gitAddAll: {
                type: 'boolean',
                default: false
            }
        };
        this.conf = new Conf({ schema })
    }

}