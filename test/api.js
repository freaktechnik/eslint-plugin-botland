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

const testArgType = (t, argType) => {
    t.is(typeof argType, "string");
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
};

const hasArgs = (t, func) => {
    t.true(api.terminators.includes(func) || api.functions.includes(func));
    t.true(Array.isArray(api.args[func]));
    for(const args of api.args[func]) {
        t.true(Array.isArray(args));
        for(const arg of args) {
            testArgType(t, arg);
        }
    }
};
hasArgs.title = (title, func) => `${title}: ${func}`;

const hasReturn = (t, func) => {
    t.true(api.terminators.includes(func) || api.functions.includes(func));
    t.is(typeof api.returns[func], "string");
    testArgType(t, api.returns[func]);
};
hasReturn.title = (title, func) => `${title} ${func}`;

const hasRequiredEntry = (t, requiredEntry) => {
    t.true(api.entrypoints.includes(requiredEntry));
};
hasRequiredEntry.title = (title, requiredEntry) => `${title}: ${requiredEntry}`;

const hasTerminator = (t, terminator) => {
    t.false(api.functions.includes(terminator));
};
hasTerminator.title = (title, terminator) => `${title}: ${terminator}`;

const hasFunction = (t, func) => {
    t.false(api.terminators.includes(func));
};
hasFunction.title = (title, func) => `${title}: ${func}`;

test('terminators', (t) => {
    const uniqueTerminators = new Set(api.terminators);
    t.is(uniqueTerminators.size, api.terminators.length);
});
test('functions', (t) => {
    const uniqueFunctions = new Set(api.functions);
    t.is(uniqueFunctions.size, api.functions.length);
});

for(const alias in api.aliases) {
    test('alias', hasAlias, alias);
}

for(const func in api.args) {
    test('args for', hasArgs, func);
}

for(const requiredEntry of api.requiredEntry) {
    test('required entry', hasRequiredEntry, requiredEntry);
}

for(const func of api.terminators) {
    test('terminator', hasTerminator, func);
}

for(const func of api.functions) {
    test('functions', hasFunction, func);
}

for(const func in api.returns) {
    test('returns', hasReturn, func);
}
