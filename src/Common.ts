/**
 * Class final, don't extends or create instance is useless
 * 
 * @final
 * @license MIT
 * @author tmslpm
 */
export abstract class Common {
    private constructor() { }
    public static ACTION_DEFAULT_TRIGGER: string = "workflow_dispatch";
    public static ACTION_DEFAULT_NODE_JS_VERSION: string = "18.7.0";
    public static ACTION_DEFAULT_PLATFORM_RUN_ON: string = "ubuntu-latest"
}