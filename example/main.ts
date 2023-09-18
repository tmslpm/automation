import { ActionManager } from "../src/ActionManager";
 
console.log("start main", __dirname, __filename);
 
// register action for generation
ActionManager.get().register(require("./tasks/helloworld.task.json"));

// generate
ActionManager.get().registredAction.forEach(v => console.log(v.toString()));