import { expect, test } from '@jest/globals';

test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

function getFakeJSON() {
    return {
        "id": "identifier-unique",
        "name": "task name",
        "description": "task description",
        "trigger": "workflow_dispatch",
        "runOn": "ubuntu-latest",
        "nodeVersion": "18.7.0"
    };
}
