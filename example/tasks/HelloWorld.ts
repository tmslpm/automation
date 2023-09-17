import { ActionGithub } from "../../src/ActionGithub";

class TestActionGithub extends ActionGithub {

    get id(): string {
        return "unique_id";
    }
    get name(): string {
        return "my task";
    }
    get description(): string {
        return "my task description";
    }

    public onExecute(): void {
        console.warn("success");
    }

}

new TestActionGithub();
