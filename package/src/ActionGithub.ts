import { IActionGithub } from "./interfaces/IActionGithub";

/**
 * Default implementation of the {@link IActionGithub}.
 * 
 * Represents a github action (https://github.com/features/actions).
 * 
 * @license MIT
 */
export abstract class ActionGithub implements IActionGithub {

    public constructor() { }
    
    abstract get id(): string;

    abstract get name(): string;

    abstract get description(): string;
  
    abstract onExecute(): void;

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

    public get trigger(): string {
        return "workflow_dispatch";
    }

    public get runOn(): string {
        return "ubuntu-latest";
    }

    public get nodeVersion(): string {
        return "18.7.0";
    }

}
