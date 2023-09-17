import { ActionGithub } from "./ActionGithub";
import { ActionManager } from "./ActionManager";

console.log("start main", __dirname, __filename);

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

const TEST_ACTION = new TestActionGithub();
TEST_ACTION.onExecute();

console.log(ActionManager.createSourceCodeAction(TestActionGithub))

