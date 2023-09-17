import { IActionGithub } from "./interfaces/IActionGithub";
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
 * So use the static {@link ActionManager.get}() method
 *
 * @example
 * 
 * Call singleton instance and execute the {@link ActionManager.build} method
 * ```ts
 * ActionManager.get().build();
 * // or
 * let manager = ActionManager.get();
 * manager.build();
 * ```
 * 
 * Modify the {@link ActionManager.PATH_FOLDER_TASKS} and call singleton instance and execute the {@link ActionManager.build} method
 * ```ts
 * ActionManager.PATH_FOLDER_TASKS = "../myCustomFolder";
 * ActionManager.get().build();
 * ``` 
 */
export class ActionManager {
    /**
     * Variable to modify the tasks folder path. 
     * 
     * @defaultValue PATH_FOLDER_TASKS = "../tasks" 
     * @example
     * ```ts
     * ActionManager.PATH_FOLDER_TASKS = "../myCustomFolder";
     * ```
     */
    public static PATH_FOLDER_TASKS: string = "../tasks";

    /** 
     * private static variable to contain singleton instance of the {@link ActionManager} class, 
     * don't use for get the instance, use {@link ActionManager.get}()
     */
    private static SINGLETON_INSTANCE: ActionManager | null = null;

    /** Map containing all {@link IActionGithub} registered during the process */
    private readonly _registredAction: Map<string, IActionGithub>;

    /**
     * Constructor {@link ActionManager}
     * 
     * The constructor is private because the class uses a singleton design pattern,
     * the goal is to restrict the instantiation of a class to a single object)
     * 
     * So use the static {@link ActionManager.get}() method
     */
    private constructor() {
        this._registredAction = new Map()
    }

    /**
     * Getter singleton, get unique instance of the {@link ActionManager} class.
     * 
     * @returns { ActionManager }
     */
    public static get(): ActionManager {
        if (!ActionManager.SINGLETON_INSTANCE) {
            ActionManager.SINGLETON_INSTANCE = new ActionManager();
        }
        return ActionManager.SINGLETON_INSTANCE;
    }

    /**
     * Method for register an {@link IActionGithub} in the {@link ActionManager}.
     * 
     * @param { IActionGithub[] } actions - action to be register
     * 
     * @returns { void }
     */
    public register(...actions: IActionGithub[]): void {
        actions.forEach((action: IActionGithub) => {
            // if not duplicate entry put action in map 
            if (this.registredAction.has(action.id))
                console.warn(`duplicate action{id: ${action.id}}`);
            else
                this.registredAction.set(action.id, action);
        });
    }

    /**
     * Get all folders in the "./src/tasks" folder, then generate all {@link IActionGithub} objects and save them in the hashmap
     * 
     * @return { void } 
     */
    public build(): void {

    }

    /**
     * Map containing all {@link IActionGithub} registered during the process
     * 
     * @returns { Map<string, IActionGithub> }
     */
    public get registredAction(): Map<string, IActionGithub> {
        return this._registredAction;
    }

    /**
     * Create raw source code for the action entry
     * 
     * @example
     * 
     * ```ts
     * class TestActionGithub extends ActionGithub { 
     *      // ... your implementation ... 
     * }
     * 
     * let str = ActionManager.createSourceCodeAction(TestActionGithub);
     * 
     * console.log(str);
     * ```
     * 
     * output console:
     * ```ts
     * import { TestActionGithub } from "./path/TestActionGithub";
     * (() => {new TestActionGithub()})();
     * ```
     * 
     * @param { Function } classRef - Class reference
     * 
     * @returns { string }
     */
    public static createSourceCodeAction(classRef: Function): string {
        return ``
            + `import { ${classRef.name} } from "./path/${classRef.name}";\n`
            + `(() => {new ${classRef.name}()})();\n`;
    }

}

