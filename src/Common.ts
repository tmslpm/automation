/**
 * Class final, don't extends or create instance is useless
 * 
 * @final
 * @license MIT
 * @author tmslpm
 */
export abstract class Common {

    /** Variable to modify the tasks folder path. */
    public static PATH_FOLDER_TASKS: string = "../tasks";

    /** Variable used if some variable is missing in the json file */
    public static ACTION_DEFAULT_DESCRIPTION: string = "has empty description";

    /** Variable used if some variable is missing in the json file */
    public static ACTION_DEFAULT_TRIGGER: string = "workflow_dispatch";

    /** Variable used if some variable is missing in the json file */
    public static ACTION_DEFAULT_NODE_JS_VERSION: string = "18.7.0";

    /** Variable used if some variable is missing in the json file */
    public static ACTION_DEFAULT_PLATFORM_RUN_ON: string = "ubuntu-latest"

}