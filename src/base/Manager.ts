import { IActionGithub } from "./IActionGithub";
import { ActionGithub } from "./ActionGithub";
import { pathResolve } from "./utils/File";
import fs from 'node:fs';
import { fnBuilderIActionGithub } from "./types/fnBuilderIActionGithub";

/** 
 * The constructor is private because **the class uses a singleton design pattern**,
 * the goal is to restrict the instantiation of a class to a single object)
 *  
 * > In software engineering, the singleton pattern is a software design pattern that 
 * > restricts the instantiation of a class to a singular instance...
 * 
 * <a href="https://en.wikipedia.org/wiki/Singleton_pattern" title="open wikipedia" target="_blank">src: wikipedia</a>
 *
 * So use the static {@link Manager.get}() method
 *
 * @example
 * 
 * Call singleton instance and execute the {@link Manager.build} method
 * ```ts
 * Manager.get().build();
 * // or
 * let manager = Manager.get();
 * manager.build();
 * ```
 * 
 * Modify the {@link Manager.PATH_FOLDER_TASKS} and call singleton instance and execute the {@link Manager.build} method
 * ```ts
 * Manager.PATH_FOLDER_TASKS = "../myCustomFolder";
 * Manager.get().build();
 * ``` 
 */
export class Manager {
    /**
     * Variable to modify the tasks folder path. 
     * 
     * @defaultValue PATH_FOLDER_TASKS = "../tasks" 
     * @example
     * ```ts
     * Manager.PATH_FOLDER_TASKS = "../myCustomFolder";
     * ```
     */
    public static PATH_FOLDER_TASKS: string = "../tasks";

    /** 
     * private static variable to contain singleton instance of the {@link Manager} class, 
     * don't use for get the instance, use {@link Manager.get}()
     */
    private static SINGLETON_INSTANCE: Manager | null = null;

    /**
     * private field for store a custom lambda function with your action constructor.
     * 
     * Call the setter manager.customActionConstructor and return your custom constructor 
     * 
     * @example
     * ```ts
     * class MyCustomActionGithub implements IActionGithub {
     *      // ... your implementation ...
     * } 
     * 
     * let m = Manager.get();
     * m.customActionConstructor = (id: string, name: string, str: string, ev: string, node: string) => {
     *      return new MyCustomActionGithub(id, name, str, ev, node);
     * };
     * ```   
     */
    private _lambdaBuilderAction: fnBuilderIActionGithub;

    /**
     * Constructor {@link Manager}
     * 
     * The constructor is private because the class uses a singleton design pattern,
     * the goal is to restrict the instantiation of a class to a single object)
     * 
     * So use the static {@link Manager.get}() method
     */
    private constructor() {
        this._lambdaBuilderAction = (id: string, name: string, description: string, trigger: string, nodeVersion: string) => new ActionGithub(id, name, description, trigger, nodeVersion);
    }

    /**
     * Getter singleton, get unique instance of the {@link Manager} class.
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
     * Get all folders in the "./src/tasks" folder, then generate all {@link IActionGithub} objects and save them in the hashmap
     * 
     * @return void 
     */
    public build(): void {
        let registredAction: Map<string, IActionGithub> = new Map()

        // Get all file/folder in folder src/tasks, apply filter for get only directory
        fs.readdirSync(pathResolve(__dirname, Manager.PATH_FOLDER_TASKS), { withFileTypes: true })
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
                        let action = this._lambdaBuilderAction(
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
     * Call this method with your custom lambda to apply your {@link IActionGithub} implementation
     * 
     * @example
     * ```ts
     * class MyCustomActionGithub implements IActionGithub {
     *      // ... your implementation ...
     * } 
     * 
     * let m = Manager.get();
     * manager.customActionConstructor = (
     *      id: string, 
     *      name: string, 
     *      description: string, 
     *      trigger: string, 
     *      nodeVersion: string
     * ) => new MyCustomActionGithub(id, name, description, trigger, nodeVersion);
     * ``` 
     * @return void
     */
    public set customActionConstructor(fn: fnBuilderIActionGithub) {
        this._lambdaBuilderAction = fn;
    }
}

 