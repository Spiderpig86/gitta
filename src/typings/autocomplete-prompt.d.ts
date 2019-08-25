/**
 * Type definition based off of https://github.com/mokkabonna/inquirer-autocomplete-prompt/issues/61
 */
declare module "inquirer-autocomplete-prompt" {
    import * as Inquirer from "inquirer";

    let AutocompletePrompt: Inquirer.prompts.PromptConstructor;
    export = AutocompletePrompt
}