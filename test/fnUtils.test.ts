import { expect, test } from '@jest/globals';
import { getOrDefault } from '../src/utils/Utils';

let FAKE_DATA = {
    value: "string",
    default_value: "default_String"
};

// [getOrDefault] Valid return value
test(`getOrDefault(${FAKE_DATA.value}, ${FAKE_DATA.default_value}) return ${FAKE_DATA.value}`, () => {
    expect(getOrDefault(FAKE_DATA.value, FAKE_DATA.default_value)).toBe(FAKE_DATA.value);
});

// [getOrDefault] Invalid return default value
test(`getOrDefault("", ${FAKE_DATA.default_value}) return ${FAKE_DATA.default_value}`, () => {
    expect(getOrDefault("", FAKE_DATA.default_value)).toBe(FAKE_DATA.default_value);
});

// [getOrDefault] Invalid return default value
test(`getOrDefault(undefined, ${FAKE_DATA.default_value}) return ${FAKE_DATA.default_value}`, () => {
    expect(getOrDefault(undefined as any, FAKE_DATA.default_value)).toBe(FAKE_DATA.default_value);
});

// [getOrDefault] Invalid return default value
test(`getOrDefault(null, ${FAKE_DATA.default_value}) return ${FAKE_DATA.default_value}`, () => {
    expect(getOrDefault(null as any, FAKE_DATA.default_value)).toBe(FAKE_DATA.default_value);
});