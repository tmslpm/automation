import { IActionGithub } from "../interfaces/IActionGithub"

/** 
 * @example 
 * ```
 * const myCustomBuilderFunction = (
 *      id: string, 
 *      name: string, 
 *      description: string, 
 *      trigger: string, 
 *      nodeVersion: string
 * ) => new ActionGithub(id, name, description, trigger, nodeVersion);
 * ```
 */
export type fnBuilderIActionGithub = {
    (
        /** Unique identifier without whitespaces */
        id: string,

        /** The name of the GitHub Action */
        name: string,

        /** The description of the GitHub Action */
        description: string,

        /** The trigger for the action */
        trigger: string,

        /** Version of NodeJS to use. Examples: `"12.x"`, `"10.15.1"`, `">=10.15.0"` */
        nodeVersion: string
    ): IActionGithub
}