import { Manager } from "./base/Manager";

console.log("Main.ts start...");

function test(a: string, b: string): number {
    return (a + b).length;
}

Manager.get().build();

console.log(test("test", "banana"))
