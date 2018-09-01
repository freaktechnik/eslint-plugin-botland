"use strict";

const scopeHasVariable = (scope, varname) => scope.set.has(varname) || (scope.upper && scopeHasVariable(scope.upper, varname)),

    walkFunction = (name, functions, calledFunctions) => {
        calledFunctions.add(name);
        for(const command of functions[name].commands) {
            if(functions.hasOwnProperty(command.name)) {
                walkFunction(command.name, functions, calledFunctions);
            }
            // else ignore, not this rule's job
        }
    };

module.exports = {
    create(context) {
        const functions = {};
        let currentFunc;
        return {
            "FunctionExpression CallExpression:exit"(node) {
                const info = functions[currentFunc];
                info.commands.push({
                    name: node.callee.name,
                    node
                });
            },
            "FunctionExpression"(node) {
                currentFunc = node.parent.left.name;
                functions[currentFunc] = {
                    commands: [],
                    node
                };
            },
            "FunctionExpression:exit"() {
                currentFunc = undefined;
            },
            'Program:exit'() {
                const calledFunctions = new Set();
                if(functions.hasOwnProperty("init")) {
                    walkFunction("init", functions, calledFunctions);
                }
                if(functions.hasOwnProperty("update")) {
                    walkFunction("update", functions, calledFunctions);
                }
                for(const func in functions) {
                    if(functions.hasOwnProperty(func) && !calledFunctions.has(func)) {
                        context.report({
                            node: functions[func].node,
                            message: "Function {{ name }} is never called",
                            data: {
                                name: func
                            }
                        });
                    }
                }
            }
        };
    },
    meta: {
        description: "Check if all variables are set before usage",
        schema: []
    }
};
