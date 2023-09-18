//import { Manager } from "./base/Manager";

import { ActionManager } from "../src/ActionManager";
import { HelloWorld } from "./HelloWorld";

console.log("start main", __dirname, __filename);

// register action for generation
ActionManager.get().register(new HelloWorld());

// generate
ActionManager.get().registredAction.forEach(v => console.log(v.toString()));