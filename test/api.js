import test from 'ava';
import api from '../api.json';

const KNOWN_TYPES = [
        "x",
        "y",
        "entity",
        "number",
        "any",
        "boolean",
        "string",
        "object" // No idea what that actually means with size()
    ],
    GLOBAL = "global:",
    ENUM = "enum:";

const hasAlias = (t, alias) => {
    const aliasedTo = api.aliases[alias];
    t.true(api.terminators.includes(aliasedTo) || api.functions.includes(aliasedTo));
    t.false(api.terminators.includes(alias) || api.functions.includes(alias));
};
hasAlias.title = (title, alias) => `${title}: ${alias}`;

const testArgumentType = (t, argumentType) => {
    t.is(typeof argumentType, "string");
    if(argumentType.endsWith("...")) {
        argumentType = argumentType.slice(0, -3);
    }
    else if(argumentType.endsWith("[]")) {
        argumentType = argumentType.slice(0, -2);
    }
    else if(argumentType.endsWith("?")) {
        argumentType = argumentType.slice(0, -1);
    }
    if(argumentType.startsWith(GLOBAL)) {
        t.true(argumentType.slice(GLOBAL.length) in api.globals);
    }
    else if(argumentType.startsWith(ENUM)) {
        t.true(argumentType.slice(ENUM.length) in api.enums);
    }
    else {
        t.true(KNOWN_TYPES.includes(argumentType));
    }
};

const hasArguments = (t, func) => {
    t.true(api.terminators.includes(func) || api.functions.includes(func));
    t.true(Array.isArray(api.args[func]));
    for(const arguments_ of api.args[func]) {
        t.true(Array.isArray(arguments_));
        for(const argument of arguments_) {
            testArgumentType(t, argument);
        }
    }
};
hasArguments.title = (title, func) => `${title}: ${func}`;

const hasReturn = (t, func) => {
    t.true(api.terminators.includes(func) || api.functions.includes(func));
    t.is(typeof api.returns[func], "string");
    testArgumentType(t, api.returns[func]);
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
    test('args for', hasArguments, func);
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
