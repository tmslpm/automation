/** https://eslint.org/docs/latest/use/command-line-interface */
console.log("loaded config", __filename)
module.exports = {
    "env": {
        "browser": false,
        "es2021": true
    },
    "plugins": [
        "@typescript-eslint/eslint-plugin",
        "eslint-plugin-tsdoc"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaVersion": "2018",
        "sourceType": "module"
    },
    "rules": {
        "tsdoc/syntax": "warn"
    }
} 
