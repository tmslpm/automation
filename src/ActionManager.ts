import { ActionGithub } from "./ActionGithub";
import { ActionConfig } from "./ActionConfig";
import { getOrThrow } from "./Utils";

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
     * @returns { void }
     */
    public register(...actionConfigs: ActionConfig[]): void {
        actionConfigs.forEach((actionConfig: ActionConfig) => {
            let actionId = getOrThrow(actionConfig.id);
            // if not duplicate entry put action in map 
            if (this.registredAction.has(actionId))
                console.warn(`duplicate action{id: ${actionId}}`);
            else
                this.registredAction.set(actionId, new ActionGithub(actionConfig));
        });
    }

    /**
     *  
     * @return { void } 
     */
    public build(): void {

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

