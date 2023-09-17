//import { Manager } from "./base/Manager";

import { ActionManager } from "../src/ActionManager";

console.log("start main", __dirname, __filename);

ActionManager.get().registredAction.forEach(v => console.log(v.toString()))