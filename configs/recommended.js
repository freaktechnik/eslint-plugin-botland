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
        "no-unsupported-syntax": "error",
        "entry-point": "error",
        "only-global-function-declaration": "error",
        "no-terminator-in-init": "warn",
        "prefer-function": "warn"
    },
    globals
};
