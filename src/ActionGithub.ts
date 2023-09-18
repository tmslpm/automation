
import { ActionConfig } from "./ActionConfig";
import { Common } from "./Common";
import { getOrDefault, getOrThrow } from "./Utils";

/** 
 * Represents a github action (https://github.com/features/actions).
 * 
 * @license MIT
 * @author tmslpm
 */
export class ActionGithub {
    private readonly _act_id: string;
    private readonly _act_name: string;
    private readonly _act_description: string;
    private readonly _act_trigger: string;
    private readonly _act_runOn: string;
    private readonly _act_nodeVersion: string;

    public constructor(actionConfig: ActionConfig) {
        this._act_id = getOrThrow(actionConfig.id);
        this._act_name = getOrDefault(actionConfig.name, this.id);
        this._act_description = getOrDefault(actionConfig.description, Common.ACTION_DEFAULT_DESCRIPTION);
        this._act_trigger = getOrDefault(actionConfig.trigger, Common.ACTION_DEFAULT_TRIGGER);
        this._act_runOn = getOrDefault(actionConfig.runOn, Common.ACTION_DEFAULT_PLATFORM_RUN_ON);
        this._act_nodeVersion = getOrDefault(actionConfig.nodeVersion, Common.ACTION_DEFAULT_NODE_JS_VERSION);
    }

    /**
     * Return the object {@link ActionGithub} as `string`.
     * 
     * @returns { string }
     */
    public toString(): string {
        return "ActionGithub {\n"
            + `  id: ${this.id},\n`
            + `  name: ${this.name},\n`
            + `  trigger: ${this.trigger},\n`
            + `  nodeVersion: ${this.nodeVersion},\n`
            + `  runOn: ${this.runOn},\n`
            + `}`;
    }

    /**
     * Create the YAML source code for this Github Action.
     * 
     * #### Example
     * 
     * see the implementation of the {@link toYAML} method in class {@link ActionGithub.ActionGithub.toYAML}
     * 
     * @returns { string }
     */
    public toYAML(): string {
        return ""
            + `name: "${this.name}"\n`
            + `run-name: \${{ github.actor }} - "this.description"\n`
            + `on: ${this.trigger}\n`
            + `jobs:\n`
            + `  build:\n`
            + `    runs-on: ${this.runOn}\n`
            + `    steps:\n`
            + `      - uses: actions/checkout@v3\n`
            + `      - uses: actions/setup-node@v3\n`
            + `        with:\n`
            + `          node-version: "${this.nodeVersion}"\n`
            + `          cache: "npm"\n`
            + `      - name: "[node]: execute ${this.name} action"\n`
            + `        run: |\n`
            + `          node src/tasks/${this.id}/entry.ts\n`;
    }

    /** 
     * Public getter {@link _act_id} 
     * 
     * @returns { string }
     */
    public get id(): string {
        return this._act_id;
    }

    /** 
     * Public getter {@link _act_name} 
     * 
     * @returns { string }
     */
    public get name(): string {
        return this._act_name;
    }

    /** 
     * Public getter {@link _act_description} 
     * 
     * @returns { string }
     */
    public get description(): string {
        return this._act_description;
    }

    /** 
     * Public getter {@link _act_trigger} 
     * 
     * @returns { string }
     */
    public get trigger(): string {
        return this._act_trigger;
    }

    /** 
     * Public getter {@link _act_runOn} 
     * 
     * @returns { string }
     */
    public get runOn(): string {
        return this._act_runOn;
    }

    /** 
     * Public getter {@link _act_nodeVersion} 
     * 
     * @returns { string }
     */
    public get nodeVersion(): string {
        return this._act_nodeVersion;
    }

}
