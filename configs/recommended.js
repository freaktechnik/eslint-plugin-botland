"use strict";

const api = require("../api.json"),

    globals = {};

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

module.exports = {
    plugins: [ 'botland' ],
    rules: {
        "no-unsupported-syntax": "error",
        "entry-point": "error",
        "no-terminator-in-init": "warn"
    },
    globals
};
