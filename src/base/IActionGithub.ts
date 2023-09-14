import { RunnerImage } from "./enum/RunnerImage";

export interface IActionGithub {

    /**
     * Create the YAML source code for this Github Action
     * 
     * @returns string
     */
    toYAML(): string;

    /** 
     * Getter action.id 
     * 
     * @returns string 
     */
    get id(): string;

    /** 
     * Getter action.name 
     * 
     * @returns string 
     */
    get name(): string;

    /** 
     * Getter action.description 
     * 
     * @returns string 
     */
    get description(): string;

    /** 
     * Getter action.trigger 
     * 
     * @returns string
     */
    get trigger(): string;

    /** 
     * Getter action.runOn 
     * 
     * @returns RunnerImage 
     */
    get runOn(): RunnerImage;

    /** 
     * Getter action.nodeVersion 
     * 
     * @returns string 
     */
    get nodeVersion(): string;

}
