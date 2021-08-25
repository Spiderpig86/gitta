import Constants from '../../utils/constants';
import { Prompter } from '../prompts';
import { list } from './list';

export class ListPrompter extends Prompter {
    protected async getPrompts(): Promise<any> {
        return [
            {
                name: Constants.LIST_CHOICE,
                message: 'What data do you want to list out?',
                type: 'list',
                choices: [
                    {
                        name: 'emojis',
                        value: Constants.LIST_EMOJI,
                    },
                    {
                        name: 'prefixes',
                        value: Constants.LIST_PREFIX,
                    },
                ],
            },
        ];
    }

    protected async getCallback(): Promise<(answers: any) => void> {
        return (answers: any) => {
            list(answers[Constants.LIST_CHOICE], this.emojiService, this.prefixService);
        };
    }
}
