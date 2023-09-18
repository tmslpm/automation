import { ActionGithub } from "./ActionGithub";
import { ActionConfig } from "./ActionConfig";
import { getOrThrow } from "./Utils";
import { existsSync, fstat } from "fs";

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
 * @license MIT
 * @author tmslpm
 */
export class ActionManager {
    /** 
     * private static variable to contain singleton instance of the {@link ActionManager} class, 
     * don't use for get the instance, use {@link ActionManager.get}()
     */
    private static SINGLETON_INSTANCE: ActionManager | null = null;

    /** Map containing all {@link ActionGithub} registered during the process */
    private readonly _registredAction: Map<string, ActionGithub>;

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
     * Method for register an {@link ActionGithub} in the {@link ActionManager}.
     * 
     * @param { ActionGithub[] } actionConfigs - action to be register
     * 
     * @returns { ActionManager } the singleton instance of the ActionManager
     */
    public register(...pathToActionConfigs: string[]): ActionManager {
        pathToActionConfigs.forEach((currentPath: string) => {
            let hasActionFile = true;
            let actionConfig = {} as ActionConfig;

            // check is a file and is json file
            if (!currentPath.endsWith("action.json")) {
                hasActionFile = false;
                console.error(">> Invalid path recevied, reason: path not ends with `action.json`, path: ", currentPath)
            }

            // check if json file exist
            if (hasActionFile && !existsSync(currentPath)) {
                hasActionFile = false;
                console.error(">> not found json file for the action, path: ", currentPath)
            }

            // try require json
            if (hasActionFile) {
                try {
                    actionConfig = require(currentPath)
                } catch (_ignored) {
                    hasActionFile = false;
                    console.log(">> Cannot require json, path: ", currentPath)
                }
            }

            // try get id 
            if (hasActionFile) {
                try {
                    getOrThrow(actionConfig.id);
                } catch (_ignored) {
                    hasActionFile = false;
                    console.log(">> Missing field `id` in action.json, path: ", currentPath)
                }
            }

            // check if typescript file exist
            if (hasActionFile) {
                let tsFileActionPath = currentPath.replace("action.json", "action.ts");
                if (!existsSync(tsFileActionPath)) {
                    hasActionFile = false;
                    console.error(">> Not found ts script for the action, path: ", tsFileActionPath)
                }
            }

            if (hasActionFile) {
                let actionId = getOrThrow(actionConfig.id);
                // if not duplicate entry put action in map 
                if (!this.registredAction.has(actionId)) {
                    this.registredAction.set(actionId, new ActionGithub(actionConfig));
                } else {
                    console.error(`duplicate action{id: ${actionId}}`);
                }
            }
        });
        return this;
    }

    /**
     *  
     * @return { void } 
     */
    public generateAction(): void {

    }

    /**
     * Map containing all {@link ActionGithub} registered during the process
     * 
     * @returns { Map<string, ActionGithub> }
     */
    public get registredAction(): Map<string, ActionGithub> {
        return this._registredAction;
    }

}

