import { expect, test } from '@jest/globals';
import { ActionManager } from '../src/ActionManager';
import { pathResolve } from '../src/Utils';


test('adds 1 + 2 to equal 3', () => {
    // (1) get singleton action manager
    let manager = ActionManager.get();


    //console.log(pathResolve(__dirname, "../example/tasks/tasks/helloworld.task.json"))
 
    // (3) generate action
    manager.generateAction();
});