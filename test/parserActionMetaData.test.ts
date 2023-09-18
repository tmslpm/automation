import { readFileSync } from "fs"
import { ParserActionMetaData } from "../src/utils/ParserActionMetaData";

const FAKE_DATA_EMPTY = "";
const FAKE_DATA = readFileSync("./example/tasks/helloworld.task.ts", "utf8")

//FAKE_DATA.split("\n").filter(Boolean).forEach(v => console.debug(v));


test('has source code helloworld.task.ts', () => {
    expect(FAKE_DATA.length).toBeGreaterThan(0);
});


test('try parser', () => {
    expect(ParserActionMetaData.tryParse(FAKE_DATA)).toBe(0);
});

test('test feature: is meta block start or not', () => {
    // valid: start with // and has tag
    expect(ParserActionMetaData.isMetaBlockStart(`// ${ParserActionMetaData.START_BLOCK_TAG}`)).toBe(true);
    expect(ParserActionMetaData.isMetaBlockStart(`      // ${ParserActionMetaData.START_BLOCK_TAG}`)).toBe(true);

    // empty/whitespace
    expect(ParserActionMetaData.isMetaBlockStart(``)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockStart(`                    `)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockStart(`//`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockStart(`//                   `)).toBe(false);
    // missing start //
    expect(ParserActionMetaData.isMetaBlockStart(` ${ParserActionMetaData.START_BLOCK_TAG}`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockStart(`       ${ParserActionMetaData.START_BLOCK_TAG}`)).toBe(false);
    // bad syntax tag 1
    expect(ParserActionMetaData.isMetaBlockStart(`// ==action-xmetadata==`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockStart(`      // ==action-xmetadata==`)).toBe(false);
    // bad syntax tag 2
    expect(ParserActionMetaData.isMetaBlockStart(`// ==actionmetadata==`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockStart(`      // ==actionmetadata==`)).toBe(false);
    // bad tag, is END_BLOCK_TAG 
    expect(ParserActionMetaData.isMetaBlockStart(`// ${ParserActionMetaData.END_BLOCK_TAG}`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockStart(`      // ${ParserActionMetaData.END_BLOCK_TAG}`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockStart(` ${ParserActionMetaData.END_BLOCK_TAG}`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockStart(`       ${ParserActionMetaData.END_BLOCK_TAG}`)).toBe(false);
});

test('test feature: is meta block end or not', () => {
    // valid: start with // and has tag
    expect(ParserActionMetaData.isMetaBlockEnd(`// ${ParserActionMetaData.END_BLOCK_TAG}`)).toBe(true);
    expect(ParserActionMetaData.isMetaBlockEnd(`      // ${ParserActionMetaData.END_BLOCK_TAG}`)).toBe(true);

    // empty/whitespace
    expect(ParserActionMetaData.isMetaBlockEnd(``)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockEnd(`                    `)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockEnd(`//`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockEnd(`//                   `)).toBe(false);

    // missing start //
    expect(ParserActionMetaData.isMetaBlockEnd(` ${ParserActionMetaData.END_BLOCK_TAG}`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockEnd(`       ${ParserActionMetaData.END_BLOCK_TAG}`)).toBe(false);
    // bad syntax tag 1
    expect(ParserActionMetaData.isMetaBlockEnd(`// ==/action-xmetadata==`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockEnd(`      // ==/action-xmetadata==`)).toBe(false);
    // bad syntax tag 2
    expect(ParserActionMetaData.isMetaBlockEnd(`// ==/actionmetadata==`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockEnd(`      // ==/actionmetadata==`)).toBe(false);
    // bad tag, is END_BLOCK_TAG 
    expect(ParserActionMetaData.isMetaBlockEnd(`// ${ParserActionMetaData.START_BLOCK_TAG}`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockEnd(`      // ${ParserActionMetaData.START_BLOCK_TAG}`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockEnd(` ${ParserActionMetaData.START_BLOCK_TAG}`)).toBe(false);
    expect(ParserActionMetaData.isMetaBlockEnd(`       ${ParserActionMetaData.START_BLOCK_TAG}`)).toBe(false);
});