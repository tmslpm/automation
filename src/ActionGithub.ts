import { ActionManager } from "./ActionManager";
import { IActionGithub } from "./interfaces/IActionGithub";

/**
 * Default implementation of the {@link IActionGithub}.
 * 
 * Represents a github action (https://github.com/features/actions).
 * 
 * @license MIT
 */
export class ActionGithub implements IActionGithub {
    public _id: string;
    public _name: string
    public _description: string;
    public _trigger: string = "workflow_dispatch";
    public _runOn: string = "ubuntu-latest";
    public _nodeVersion: string = "18.7.0";

    // id: string, name: string, description: string
    public constructor() {
        this._id = "id";
        this._name = "name";
        this._description = "description";
    }

    public static build() {
        return new this();
    }

    public onExecute(): void {
        console.warn("{@link ActionGithub.onExecute} not implemented.", this.toString());
    }

    public toString(): string {
        return "ActionGithub {\n"
            + `  id: ${this.id},\n`
            + `  name: ${this.name},\n`
            + `  trigger: ${this.trigger},\n`
            + `  nodeVersion: ${this.nodeVersion},\n`
            + `  runOn: ${this.runOn},\n`
            + `}`;
    }

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

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    public get trigger(): string {
        return this._trigger;
    }

    public get runOn(): string {
        return this._runOn;
    }

    public get nodeVersion(): string {
        return this._nodeVersion;
    }

}
