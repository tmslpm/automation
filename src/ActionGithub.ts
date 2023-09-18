
import { ActionConfig } from "./ActionConfig";

/**
 * Default implementation of the {@link IActionGithub}.
 * 
 * Represents a github action (https://github.com/features/actions).
 * 
 * @license MIT
 */
export class ActionGithub {
    private readonly _id: string;
    private readonly _config: ActionConfig

    // id: string, name: string, description: string
    public constructor(actionConfig: ActionConfig) {
        if (!actionConfig.id) {
            throw new Error("missing unique identifier in task.json")
        }
        this._id = actionConfig.id;
        this._config = actionConfig;
    }

    /**
     * Return the object {@link IActionGithub} as `string`.
     * 
     * #### Example
     * 
     * see the implementation of the {@link toString} method in class {@link ActionGithub.ActionGithub.toString} 
     * 
     * @returns { string }
     */
    public toString(): string {
        return "ActionGithub {\n"
            + `  id: ${this.id},\n`
            + `  name: ${this.config.name},\n`
            + `  trigger: ${this.config.trigger},\n`
            + `  nodeVersion: ${this.config.nodeVersion},\n`
            + `  runOn: ${this.config.runOn},\n`
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
            + `name: "${this.config.name}"\n`
            + `run-name: \${{ github.actor }} - "this.description"\n`
            + `on: ${this.config.trigger}\n`
            + `jobs:\n`
            + `  build:\n`
            + `    runs-on: ${this.config.runOn}\n`
            + `    steps:\n`
            + `      - uses: actions/checkout@v3\n`
            + `      - uses: actions/setup-node@v3\n`
            + `        with:\n`
            + `          node-version: "${this.config.nodeVersion}"\n`
            + `          cache: "npm"\n`
            + `      - name: "[node]: execute ${this.config.name} action"\n`
            + `        run: |\n`
            + `          node src/tasks/${this.config.id}/entry.ts\n`;
    }

    

    /** 
     * Getter `action.id`. 
     * 
     * @returns { string }
     */
    get id(): string {
        return this._id;
    }

    /** 
     * Getter `action.config`. 
     * 
     * @see {@link ActionConfig}
     * 
     * @returns { ActionConfig }
     */
    get config(): ActionConfig {
        return this._config;
    }
}
