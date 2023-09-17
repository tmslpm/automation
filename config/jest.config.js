/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
console.log("loaded config", __filename)
/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageProvider: "v8",
    roots: [
        "../test"
    ],
};

module.exports = config;
