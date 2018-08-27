"use strict";

const api = require("../api.json"),
    globals = {},
    ecmaGlobals = [
        'Math',
        'Array',
        'Object',
        'Number',
        'Boolean',
        'Reflect',
        'Symbol',
        'String',
        'Map',
        'Set',
        'WeakMap',
        'WeakSet'
    ];

for(const terminator of api.terminators) {
    globals[terminator] = true;
}
for(const func of api.functions) {
    globals[func] = true;
}
for(const global of api.globals) {
    globals[global] = true;
}
for(const alias in api.aliases) {
    globals[alias] = true;
}
for(const ecmaGlobal of ecmaGlobals) {
    globals[ecmaGlobal] = false;
}

module.exports = {
    plugins: [ 'botland' ],
    rules: {
        "botland/no-unsupported-syntax": "error",
        "botland/entry-point": "error",
        "botland/only-global-function-declaration": "error",
        "botland/use-array-variables": "error",
        "botland/no-terminator-in-init": "warn",
        "botland/prefer-function": "warn"
    },
    globals
};
