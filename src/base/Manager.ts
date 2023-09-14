import { IActionGithub } from "./IActionGithub";
import { ActionGithub } from "./ActionGithub";
import fs from 'node:fs';
import { pathResolve } from "./utils/File";

/**
 * Manager Class
 */
export class Manager {
    private static SINGLETON_INSTANCE: Manager | null = null;
    private readonly _registredAction: Map<string, IActionGithub>;
    private _lambdaConstructionAction: (id: string, name: string, description: string, trigger: string, nodeVersion: string) => IActionGithub;

    /** private constructor, use singleton getter: Manager.get() */
    private constructor() {
        /* private constructor, use singleton getter: Manager.get() */
        this._registredAction = new Map();
        this._lambdaConstructionAction = (id: string, name: string, description: string, trigger: string, nodeVersion: string) => new ActionGithub(id, name, description, trigger, nodeVersion);
    }

    /**
     * Getter unique instance of the Manager class
     * @returns Manager
     */
    public static get(): Manager {
        if (!Manager.SINGLETON_INSTANCE) {
            Manager.SINGLETON_INSTANCE = new Manager();
        }
        return Manager.SINGLETON_INSTANCE;
    }

    /**
     * Get all folders in the "./src/tasks" folder, then generate all IActionGithub objects and save them in the hashmap
     * 
     * @return void 
     */
    public build(): void {
        // Get all file/folder in folder src/tasks, apply filter for get only directory
        fs.readdirSync(pathResolve(__dirname, "../tasks"), { withFileTypes: true })
            .filter(dir => dir.isDirectory())
            .map(dir => {
                // resolve tasks path
                let taskPath = pathResolve(dir.path, dir.name);
                try {
                    let pathTask = pathResolve(taskPath, "config.json");
                    if (fs.existsSync(pathTask)) {
                        // try get config path
                        let rawJSON = fs.readFileSync(pathResolve(taskPath, "config.json"), "utf-8");
                        // try parse config.json
                        let parsedJSON: any = JSON.parse(rawJSON);

                        // create IActionGithub
                        let action = this._lambdaConstructionAction(
                            dir.name,
                            parsedJSON.name ? parsedJSON.name : dir.name,
                            parsedJSON.description ? parsedJSON.description : `empty description`,
                            parsedJSON.trigger ? parsedJSON.trigger : "workflow_dispatch",
                            parsedJSON.nodeVersion ? parsedJSON.nodeVersion : "18.7.0"
                        );

                        // if not duplicate entry put action in map 
                        if (this._registredAction.has(action.id))
                            console.warn(`duplicate action {id: ${action.id}, path: ${dir.path}}`);
                        else
                            this._registredAction.set(action.id, action);
                    } else {
                        console.warn(`file config.json does not exist for tasks {id: ${dir.name}, path: ${dir.path}}`);
                    }
                } catch (error) {
                    console.warn(`impossible to parse config.json for tasks {id: ${dir.name}, path: ${dir.path}}`);
                }
            });
    }


    /**
     * Setter, define custom lambda with your action constructor (class YourAction implements IActionGitHub { ... })
     * 
     * @return void
     */
    public set customActionConstructor(lambdaConstructionAction: (id: string, name: string, description: string, trigger: string, nodeVersion: string) => IActionGithub) {
        this._lambdaConstructionAction = lambdaConstructionAction;
    }
}