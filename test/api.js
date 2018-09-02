import test from 'ava';
import api from '../api.json';

const KNOWN_TYPES = [
        "x",
        "y",
        "entity",
        "number",
        "any",
        "boolean",
        "string"
    ],
    GLOBAL = "global:",
    ENUM = "enum:";

const hasAlias = (t, alias) => {
    const aliasedTo = api.aliases[alias];
    t.true(api.terminators.includes(aliasedTo) || api.functions.includes(aliasedTo));
    t.false(api.terminators.includes(alias) || api.functions.includes(alias));
};
hasAlias.title = (title, alias) => `${title}: ${alias}`;

const hasArgs = (t, func) => {
    t.true(api.terminators.includes(func) || api.functions.includes(func));
    t.true(Array.isArray(api.args[func]));
    for(const args of api.args[func]) {
        t.true(Array.isArray(args));
        for(const arg of args) {
            t.is(typeof arg, "string");
            let argType = arg;
            if(argType.endsWith("...")) {
                argType = argType.substr(0, argType.length - 3);
            }
            else if(argType.endsWith("[]")) {
                argType = argType.substr(0, argType.length - 2);
            }
            if(argType.startsWith(GLOBAL)) {
                t.true(argType.substr(GLOBAL.length) in api.globals);
            }
            else if(argType.startsWith(ENUM)) {
                t.true(argType.substr(ENUM.length) in api.enums);
            }
            else {
                t.true(KNOWN_TYPES.includes(argType));
            }
        }
    }
};
hasArgs.title = (title, func) => `${title}: ${func}`;

const hasRequiredEntry = (t, requiredEntry) => {
    t.true(api.entrypoints.includes(requiredEntry));
};
hasRequiredEntry.title = (title, requiredEntry) => `${title}: ${requiredEntry}`;

for(const alias in api.aliases) {
    test('alias', hasAlias, alias);
}

for(const func in api.args) {
    test('args for', hasArgs, func);
}

for(const requiredEntry of api.requiredEntry) {
    test('required entry', hasRequiredEntry, requiredEntry);
}
