import * as Inquirer from 'inquirer';
import * as ParentDirs from 'parent-dirs';
import * as Path from 'path';
import * as PathExists from 'path-exists';
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

    // PRIVATE METHODS

    /**
     * Verify that the CLI is running within a valid Git directory.
     *
     * @private
     * @returns {boolean} - if we are currently inside a valid Git directory.
     * @memberof Gittr
     */
    private isGitRepository(): boolean {
        return ParentDirs.parentDirs(process.cwd())
            .some((directory: string) => PathExists.sync(Path.resolve(directory, '.git')));
    }

}