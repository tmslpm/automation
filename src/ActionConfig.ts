/**
 * @example
 * file: **my-action.task.json**
 * ```json
 * {
 *   "id": "my-action-identifier-unique",
 *   "name": "my action name",
 *   "description": "my awesome description",
 *   "trigger": "workflow_dispatch",
 *   "runOn": "ubuntu-latest",
 *   "nodeVersion": "18.7.0"
 * }
 * ```
 * @license MIT
 * @author tmslpm
 */
export type ActionConfig = {
    /** string without whitespace, the unique identifier for the action, default = `undefined`*/
    id: string | undefined,

    /** string, the name for the action, default = `${action.id}` */
    name: string,

    /** string, the description for the action, default= `has empty description` */
    description: string,

    /** string, action trigger, default = `workflow_dispatch` */
    trigger: string,

    /** string, os type, recommanded ubuntu-latest, default = `ubuntu-latest` */
    runOn: string,

    /** string, nodeJS version, default = `18.7.0` */
    nodeVersion: string
}