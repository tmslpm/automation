import { expect, test } from '@jest/globals';
import { getOrDefault, getOrThrow } from '../src/Utils';

///////////////////////////////// getOrDefault(...) /////////////////////////////////////////

{ // [getOrDefault] entry is string return entry
    test(`test getOrDefault(...): entry is string return entry`, () => {
        // value with word
        let entry = "string";
        expect(getOrDefault(entry, "default_value")).toBe(entry);
        // value with line
        entry = " str dqz zqing ";
        expect(getOrDefault(entry, "default_value")).toBe(entry);
        // value with number
        entry = "244";
        expect(getOrDefault(entry, "default_value")).toBe(entry);
        // value is empty
        entry = "";
        expect(getOrDefault(entry, "default_value")).toBe(entry);
        // value with whitespace;
        entry = "    ";
        expect(getOrDefault(entry, "default_value")).toBe(entry);
    });

    // [getOrDefault] entry is null|undefined return default_value string
    test(`test getOrDefault(...): entry is null|undefined return default_value string`, () => {
        let dataEmpty = {} as any;
        // with default value contains line
        let default_value = "is a string";
        expect(getOrDefault(null, default_value)).toBe(default_value);
        expect(getOrDefault(undefined, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.id, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.dioqzkdok, default_value)).toBe(default_value);
        // with default value contains word
        default_value = "isastring";
        expect(getOrDefault(null, default_value)).toBe(default_value);
        expect(getOrDefault(undefined, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.id, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.dioqzkdok, default_value)).toBe(default_value);
        // with default value contains empty value in string
        default_value = "";
        expect(getOrDefault(null, default_value)).toBe(default_value);
        expect(getOrDefault(undefined, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.id, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.dioqzkdok, default_value)).toBe(default_value);
        // with default value contains only whitespace in string 
        default_value = "    ";
        expect(getOrDefault(null, default_value)).toBe(default_value);
        expect(getOrDefault(undefined, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.id, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.dioqzkdok, default_value)).toBe(default_value);
    });

}

{ // [getOrDefault] entry is number return entry
    test(`test getOrDefault(...): entry is number return entry`, () => {
        let entry = 0;
        expect(getOrDefault(entry, 545)).toBe(entry);
        entry = 1;
        expect(getOrDefault(entry, 5454)).toBe(entry);
        entry = -1;
        expect(getOrDefault(entry, 45454564646)).toBe(entry);
        entry = 255;;
        expect(getOrDefault(entry, 6464664)).toBe(entry);
        entry = 255.5;
        expect(getOrDefault(entry, 64466464)).toBe(entry);
        entry = 200000000000055.5555555555555555555555555
        expect(getOrDefault(entry, 646466)).toBe(entry);
        entry = -200000000000055.5555555555555555555555555
        expect(getOrDefault(entry, 4646664)).toBe(entry);
        entry = 255;
        expect(getOrDefault(entry, 64666464)).toBe(entry);
    });
    // [getOrDefault] entry is null|undefined return default_value number
    test(`test getOrDefault(...): entry is null|undefined return default_value number`, () => {
        let dataEmpty = {} as any;
        // with default value without decimals 
        let default_value = 0;
        expect(getOrDefault(null, default_value)).toBe(default_value);
        expect(getOrDefault(undefined, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.id, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.dioqzkdok, default_value)).toBe(default_value);
        // with default value without decimals 
        default_value = -10;
        expect(getOrDefault(null, default_value)).toBe(default_value);
        expect(getOrDefault(undefined, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.id, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.dioqzkdok, default_value)).toBe(default_value);
        // with default value contains decimals 
        default_value = 10.50;
        expect(getOrDefault(null, default_value)).toBe(default_value);
        expect(getOrDefault(undefined, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.id, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.dioqzkdok, default_value)).toBe(default_value);
        // with default value contains decimals 
        default_value = -10.50;
        expect(getOrDefault(null, default_value)).toBe(default_value);
        expect(getOrDefault(undefined, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.id, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.dioqzkdok, default_value)).toBe(default_value);
    });
}

{ // [getOrDefault] entry is boolean return entry
    test(`test getOrDefault(...): entry is boolean return entry`, () => {
        expect(getOrDefault(true, false)).toBe(true);
        expect(getOrDefault(false, true)).toBe(false);
    });
    test(`test getOrDefault(...): entry is null|undefined return default_value boolean`, () => {
        let dataEmpty = {} as any;
        // with default value contains line
        let default_value = true;
        expect(getOrDefault(null, default_value)).toBe(default_value);
        expect(getOrDefault(undefined, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.id, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.dioqzkdok, default_value)).toBe(default_value);
        default_value = false;
        expect(getOrDefault(null, default_value)).toBe(default_value);
        expect(getOrDefault(undefined, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.id, default_value)).toBe(default_value);
        expect(getOrDefault(dataEmpty.dioqzkdok, default_value)).toBe(default_value);
    });

}

////////////////////////////////// getOrThrow(...) ///////////////////////////////////////////

{ // [getOrThrow] entry has value return value
    test("test getOrThrow(...): entry has value return entry", () => {
        let data = { id: "string", num: 0, has: true, hasNot: false };
        Object.values(data).forEach(v => expect(getOrThrow(v)).toBe(v));
    });
}

{ // [getOrThrow] entry has null|undefined throw error 
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
}