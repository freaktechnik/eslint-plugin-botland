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
        'WeakSet',
        'console',
        'parseInt',
        'parseFloat',
        'isNaN',
        'ArrayBuffer',
        'Function',
        'AsyncFunction',
        'Atomics',
        'DataView',
        'Date',
        'Error',
        'Float32Array',
        'Float64Array',
        'Generator',
        'GeneratorFunction',
        'Int16Array',
        'Int32Array',
        'Int8Array',
        'Intl',
        'JSON',
        'Proxy',
        'RegExp',
        'SharedArrayBuffer',
        'SyntaxError',
        'TypeError',
        'TypedArray',
        'Uint16Array',
        'Uint32Array',
        'Uint8Array',
        'Uint8ClampedArray',
        'decodeURI',
        'decodeURIComponent',
        'encodeURI',
        'encodeURIComponent',
        'isFinite',
        'eval'
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
        "botland/code-length": "error",
        "botland/no-big-array": "error",
        "botland/no-terminator-in-init": "warn",
        "botland/prefer-function": "warn"
    },
    globals
};
