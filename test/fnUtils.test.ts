import { expect, test } from '@jest/globals';
import { getOrDefault, getOrThrow } from '../src/utils/Utils';

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// [getOrDefault] entry is string return entry
test(`test getOrDefault(...): entry is string return entry`, () => {
    let entry = "string"
    expect(getOrDefault(entry, "default_value")).toBe(entry);
    entry = " string "
    expect(getOrDefault(entry, "default_value")).toBe(entry);
    entry = "_-stri ng"
    expect(getOrDefault(entry, "default_value")).toBe(entry);
    entry = "str dqz zqing"
    expect(getOrDefault(entry, "default_value")).toBe(entry);
    entry = "244"
    expect(getOrDefault(entry, "default_value")).toBe(entry);
});

// [getOrDefault] entry is empty return default value
test(`test getOrDefault(...): entry is empty return default value`, () => {
    expect(getOrDefault("", "default_value")).toBe("default_value");
});

// [getOrDefault] entry undefined|null return default value
test(`test getOrDefault(...): entry is undefined|null return default value`, () => {
    expect(getOrDefault(undefined as any, "default_value")).toBe("default_value");
    expect(getOrDefault(null as any, "default_value")).toBe("default_value");
});

// [getOrDefault] entry not string return default value
test(`test getOrDefault(...): entry not string return default value`, () => {
    expect(getOrDefault(0 as any, "default_value")).toBe("default_value");
    expect(getOrDefault(155 as any, "default_value")).toBe("default_value");
    expect(getOrDefault(true as any, "default_value")).toBe("default_value");
    expect(getOrDefault(false as any, "default_value")).toBe("default_value");
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// [getOrThrow] entry has value return value
test("test getOrThrow(...): entry has value return entry", () => {
    let data = { id: "string", num: 0, has: true, hasNot: false };
    Object.values(data).forEach(v => expect(getOrThrow(v)).toBe(v));
});

// [getOrThrow] entry has null|undefined throw error 
test("test getOrThrow(...): entry has null|undefined throw error", () => {
    // TEST: null
    expect(() => getOrThrow(null)).toThrow(/NullPointerException/);
    // TEST: undefined 
    expect(() => getOrThrow(undefined)).toThrow(/NullPointerException/);
    // TEST: EMPTY
    let dataEmpty = {} as any;
    expect(() => getOrThrow(dataEmpty.id)).toThrow(/NullPointerException/);
    expect(() => getOrThrow(dataEmpty.undimdq)).toThrow(/NullPointerException/);
    expect(() => getOrThrow(dataEmpty.hasNot)).toThrow(/NullPointerException/);
});