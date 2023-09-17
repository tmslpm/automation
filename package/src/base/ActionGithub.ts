import { IActionGithub } from "./IActionGithub";
import { RunnerImage } from "./enum/RunnerImage";

/**
 * Default implementation of the {@link IActionGithub}
 * 
 * @license MIT
 */
export class ActionGithub implements IActionGithub {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _description: string;
    private readonly _trigger: string;
    private readonly _nodeVersion: string;
    private readonly _runOn: RunnerImage;

    /**
     * Constructor ActionGithub: represents a github action (https://github.com/features/actions).
     * 
     * @param id string, identifier unique without whitespace
     * @param name string, name any charactere
     * @param description string, description action
     * @param trigger string, action trigger, default = workflow_dispatch
     * @param nodeVersion string, nodeJS version, default = 18.7.0
     * @param runOn string, os type, **recommanded ubuntu-latest**, default = ubuntu-latest
     */
    public constructor(
        id: string,
        name: string,
        description: string,
        trigger = "workflow_dispatch",
        nodeVersion = "18.7.0",
        runOn = RunnerImage.Ubuntu_22_04_latest
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._trigger = trigger;
        this._nodeVersion = nodeVersion;
        this._runOn = runOn;
    }

    public toYAML(): string {
        let yaml = "";
        yaml += "name: \"" + this.name + "\"";
        yaml += "run-name: ${{ github.actor }} - \"" + this.description + "\""
        yaml += "on: " + this.trigger
        yaml += "jobs:"
        yaml += "  build:"
        yaml += "    runs-on: " + this.runOn
        yaml += "    steps:"
        yaml += "      - uses: actions/checkout@v3"
        yaml += "      - uses: actions/setup-node@v3"
        yaml += "        with:"
        yaml += "          node-version: \"" + this.nodeVersion + "\""
        yaml += "          cache: \"npm\""
        yaml += "      - name: \"[node]: execute " + this.name + "/entry.ts\""
        yaml += "        run: |"
        yaml += "          node src/tasks/" + this.id + "/entry.ts"
        return yaml;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public get trigger(): string {
        return this._trigger;
    }

    public get runOn(): RunnerImage {
        return this._runOn;
    }

    public get nodeVersion(): string {
        return this._nodeVersion;
    }

}
