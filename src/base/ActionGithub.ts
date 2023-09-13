export class ActionGithub {
    private readonly _name: string;
    private readonly _description: string;

    constructor() {
        
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }
    
}