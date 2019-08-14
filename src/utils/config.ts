import Conf from 'conf';
import Constants from './constants';
import ConfModel from '../models/conf';

/**
 * Configuration manager for Gittr
 *
 * @export
 * @class Config
 */
export default class Config {

    
    private conf: Conf<ConfModel>;

    constructor() {
        this.conf = new Conf({ schema: {
            emojiFormat: {
                type: 'string',
                default: Constants.SETTINGS_EMOJI_FORMAT_MARKDOWN
            },
            gitAddAll: {
                type: 'boolean',
                default: false
            }
        }});
    }

}