
/**
 * Interface to be implemented if you create a new custom action
 * 
 * @example
 * 
 * ```ts
 * class MyCustomActionGithub implements IActionGithub {
 *      ... method implemented ...
 * }
 * ```
 */
export interface IActionGithub {
  
    /**
     * Method called when the action is executed.
     * 
     * @example
     * 
     * ```ts
     * class ExampleActionGithub implements IActionGithub {
     *      onExecute(): void { console.log("action executed with success"); }
     *      // ... other methods ...
     * }
     * ```  
     * 
     * @returns { void }
     */
    onExecute(): void;
  
    /**
     * Return the object {@link IActionGithub} as `string`.
     * 
     * #### Example
     * 
     * see the implementation of the {@link toString} method in class {@link ActionGithub.ActionGithub.toString} 
     * 
     * @returns { string }
     */
    toString(): string;

    /**
     * Create the YAML source code for this Github Action.
     * 
     * #### Example
     * 
     * see the implementation of the {@link toYAML} method in class {@link ActionGithub.ActionGithub.toYAML}
     * 
     * @returns { string }
     */
    toYAML(): string;

    /** 
     * Getter `action.id`.
     * 
     * @example
     * 
     * ```ts
     * class ExampleActionGithub implements IActionGithub {
     *      get id(): string { return "my_awesome_action_identifier"; }
     *      // ... other methods ...
     * }
     * ```  
     * 
     * @returns { string }
     */
    get id(): string;

    /** 
     * Getter `action.name`.
     * 
     * @example
     * 
     * ```ts
     * class ExampleActionGithub implements IActionGithub {
     *      get name(): string { return "my awesome action"; }
     *      // ... other methods ...
     * }
     * ```  
     * 
     * @returns { string }
     */
    get name(): string;

    /** 
     * Getter `action.description`.
     * 
     * @example
     * 
     * ```ts
     * class ExampleActionGithub implements IActionGithub {
     *      get description(): string { return "my action description"; }
     *      // ... other methods ...
     * }
     * ```  
     * 
     * @returns { string }
     */
    get description(): string;

    /** 
     * Getter `action.trigger`.
     * 
     * @example
     * 
     * ```ts
     * class ExampleActionGithub implements IActionGithub {
     *      get trigger(): string { return "workflow_dispatch"; }
     *      // ... other methods ...
     * }
     * ```  
     * 
     * @returns { string }
     */
    get trigger(): string;

    /** 
     * Getter `action.runOn`.
     * 
     * @example
     * 
     * ```ts
     * class ExampleActionGithub implements IActionGithub { 
     *      get runOn(): string { return "ubuntu-latest"; }     
     *      // ... other methods ...
     * }
     * ```  
     * 
     * @returns { string } 
     */
    get runOn(): string;

    /** 
     * Getter `action.nodeVersion`.
     * 
     * @example
     * 
     * ```ts
     * class ExampleActionGithub implements IActionGithub {
     *      get nodeVersion(): string { return "18.7.0"; }     
     *      // ... other methods ...
     * }
     * ```  
     * 
     * @returns { string }
     */
    get nodeVersion(): string;

} 
