import path from 'node:path';
import os from 'node:os';

/**
 * Try get value or return default value
 * 
 * Note: if the entry is a string and value is the empty (like `"" or "  "`) 
 * then the entry is accepted and defaultValue is not returned.
 * 
 * @param { T } value 
 * @param { T } defaultValue 
 * 
 * @returns { T }
 *  
 */
export function getOrDefault<T>(value: T, defaultValue: T): T {
    // accept empty string for the value
    if (typeof value === 'string' && value.length == 0)
        return value;
    // prevent evaluation of number 1 and 0 as Boolean expréssion 
    if (typeof value === 'number' && (value == 0 || value == 1))
        return value;
    // accept boolean value
    if (typeof value === 'boolean' && (value == true || value == false))
        return value;
    // other type
    return value ? value : defaultValue;
};

/**
 * Try get or throw value for the entry
 * 
 * @throws { Error } entry value is `null` or `undefined`
 * 
 * @param { T } value the value entry
 * 
 * @returns { T } the value entry
 */
export function getOrThrow<T>(value: T) {
    if (value != null || value != undefined)
        return value;
    throw new Error("NullPointerException value: " + value);
};

/**
 * more information see {@link path.resolve}
 * 
 * @param paths A sequence of paths or path segments.
 * 
 * @throws {TypeError} if any of the arguments is not a string.
 * 
 * @returns { string }
 */
export function pathResolve(...paths: string[]): string {
    if (os.type() === "Windows_NT")
        return path.resolve(...paths).replace(/\\/g, '/');
    return path.resolve(...paths);
}