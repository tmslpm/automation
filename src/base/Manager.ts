import { IActionGithub } from "./IActionGithub";
import { ActionGithub } from "./ActionGithub";
import fs from 'node:fs';
import { pathResolve } from "./utils/File";

export class Manager {
    /** 
     * private static variable to contain singleton instance of the Manager class, 
     * don't use for get the instance, use `Manager.get()`
     */
    private static SINGLETON_INSTANCE: Manager | null = null;

    /**
     * private field for store a custom lambda function with your action constructor.
     * 
     * Call the setter manager.customActionConstructor and return your custom constructor (extended implementation from IactionGithub!)
     * ```ts
     * Manager.get().customActionConstructor = (id: string, name: string, text: string, e: string, node: string) => {
     *  return new ActionGithub(id, name, text, e, node);
     * };
     * ```  
     */
    private _lambdaConstructionAction: (id: string, name: string, description: string, trigger: string, nodeVersion: string) => IActionGithub;

    /**
     * Constructor Manager Object
     * 
     * The constructor is private because the class uses a singleton design pattern,
     * the goal is to restrict the instantiation of a class to a single object)
     * 
     * So use the static get() method
     */
    private constructor() {
        this._lambdaConstructionAction = (id: string, name: string, description: string, trigger: string, nodeVersion: string) => new ActionGithub(id, name, description, trigger, nodeVersion);
    }

    /**
     * Getter singleton, get unique instance of the Manager class.
     * 
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
        let registredAction: Map<string, IActionGithub> = new Map()

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
                        if (registredAction.has(action.id))
                            console.warn(`duplicate action {id: ${action.id}, path: ${dir.path}}`);
                        else
                            registredAction.set(action.id, action);
                    } else {
                        console.warn(`file config.json does not exist for tasks {id: ${dir.name}, path: ${dir.path}}`);
                    }
                } catch (error) {
                    console.warn(`impossible to parse config.json for tasks {id: ${dir.name}, path: ${dir.path}}`);
                }
            });
    }

    /**
     * Setter
     * 
     * define a custom lambda function with your action constructor (class YourAction implements IActionGitHub { ... })
     * 
     * ```ts
     * let m = Manager.get();
     * 
     * m.customActionConstructor = (id: string, name: string, str: string, ev: string, node: string) => {
     *      return new ActionGithub(id, name, str, ev, node);
     * };
     * ```  
     * @return void
     */
    public set customActionConstructor(fn: (id: string, name: string, description: string, trigger: string, nodeVersion: string) => IActionGithub) {
        this._lambdaConstructionAction = fn;
    }
}