import { ActionManager } from "../src/ActionManager";
import { pathResolve } from "../src/Utils";
console.log("start main", __dirname, __filename);

(() => {
    // (1) get singleton action manager
    let manager = ActionManager.get();

    // (2) register action for generation
    manager.register(pathResolve(__dirname, "./actions/helloworld/helloworld.action.json"));
    manager.register(pathResolve(__dirname, "./actions/rndNumber/rndNumber.action.json"));

    //manager.register(pathResolve(__dirname, "./actions/bad.action.json"));

    // (3) generate action
    manager.generateAction(); 
})();
