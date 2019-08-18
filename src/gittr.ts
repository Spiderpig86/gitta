import * as Inquirer from 'inquirer';
import * as PromptConstructor from 'inquirer-autocomplete-prompt';

Inquirer.registerPrompt(
    'autocomplete', PromptConstructor
)

/**
 * Main class handling CLI functionality.
 *
 * @export
 * @class Gittr
 */
export default class Gittr {

    constructor(api: any) {
        // TODO: Add client for refereshing most recent list of emojis
    }

    public commit(): void {

    }

    public reconfig(): void {

    }

    public list(): void {

    }

    public search(): void {

    }

    public version(): void {
        
    }

}