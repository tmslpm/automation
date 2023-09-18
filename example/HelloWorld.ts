import { ActionGithub } from "../src/ActionGithub";


export class HelloWorld extends ActionGithub {

    public constructor() {
        super();
        this._id = "hello-world";
        this._name = "hello world";
        this._description = "print hello world";
    }

    public onExecute(): void {
        console.warn("hello world, success executed");
    }

}

