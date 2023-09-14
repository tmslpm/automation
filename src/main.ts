import { Manager } from "./base/Manager";

console.log("Main.ts start...");

/**
 * return string length
 * 
 * @param a string A 
 * @param b string B
 * @returns number, the size length
 */
function test(a: string, b: string): number {
    return (a + b).length;
}

Manager.get().build();

console.log(test("test", "banana"))
