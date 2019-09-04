import * as Inquirer from 'inquirer';

import { Config } from './config';
import Constants from './constants';

/**
 * Abstract class for implementing prompters.
 * 
 * @export
 * @abstract
 * @class Prompter
 */
export abstract class Prompter {

    protected config: Config;

    constructor() {
        this.config = new Config();
    }

    public prompt(prompts: any, callback: (answers: any) => void): any {
        return Inquirer.prompt(prompts).then(callback);
    }

    public getConfigHook(): Config {
        return this.config;
    }

}

/**
 * Prompter designed for setting user preferences in the configuration setup stage.
 * 
 * @export
 * @class ConfigPrompter
 * @extends {Prompter}
 */
export class ConfigPrompter extends Prompter {

    constructor() {
        super();
    }

    public prompt(): any {
        const prompts: any = [
            {
                name: Constants.SETTINGS_ADD_ALL_KEY,
                message: 'Automatically add all files to your commmit.',
                type: 'confirm'
            },
            {
                name: Constants.SETTINGS_EMOJI_FORMAT_KEY,
                message: 'Choose how your emojis should be displayed.',
                type: 'list',
                choices: [
                    {
                        name: 'Github',
                        value: ':tada:'
                    },
                    {
                        name: 'Unicode',
                        value: '🎉'
                    }
                ]
            },
            {
                name: Constants.SETTINGS_SIGN_COMMIT_KEY,
                message: 'Set if commits should be signed by default.',
                type: 'confirm'
            },
            {
                name: Constants.SETTINGS_ENABLE_UDACITY_STYLE_COMMIT_KEY,
                message: 'Set if Udacity style commits should be used.',
                type: 'confirm'
            }
        ];
        const callback: (answers: any) => void = ((answers: any) => {
            this.getConfigHook().setAddAll(answers[Constants.SETTINGS_ADD_ALL_KEY]);
            this.getConfigHook().setEmojiFormat(answers[Constants.SETTINGS_EMOJI_FORMAT_KEY]);
            this.getConfigHook().setSignCommit(answers[Constants.SETTINGS_SIGN_COMMIT_KEY]);
            this.getConfigHook().setUdacityStyleCommit(answers[Constants.SETTINGS_ENABLE_UDACITY_STYLE_COMMIT_KEY]);
        });
        return super.prompt(prompts, callback);
    }
}