import path from 'node:path';
import os from 'node:os';

export const IS_WINDOW = os.type() === "Windows_NT";

/**
 * Resolve path cross plateform
 * @param a: path left
 * @param b: path right 
 * @returns path resolved string
 */
export const pathResolve = (a: string, b: string): string => IS_WINDOW
    ? path.resolve(a, b).replace(/\\/g, '/')
    : path.resolve(a, b);
