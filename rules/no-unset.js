"use strict";

const api = require("../api.json"),
    scopeHasVariable = (scope, varname) => scope.set.has(varname) || (scope.upper && scopeHasVariable(scope.upper, varname)),
    walkFunction = (name, functions, setVars, context, called) => {
        const arguments_ = new Set();
        called.add(name);
        for(const command of functions[name].commands) {
            switch(command.type) {
            case "call":
                if(functions.hasOwnProperty(command.name) && !called.has(command.name)) {
                    walkFunction(command.name, functions, setVars, context, called);
                }
                else if(!scopeHasVariable(command.scope, command.name) && !called.has(command.name)) {
                    context.report({
                        node: command.node,
                        message: "Function {{ funcName }} must be set in the top level scope before usage",
                        data: {
                            funcName: command.node.callee.name
                        }
                    });
                }
                break;
            case "write":
                if(command.arg && !setVars.has(command.name)) {
                    arguments_.add(command.name);
                }
                else if(!arguments_.has(command.name) && !command.arg) {
                    arguments_.delete(command.name);
                }
                setVars.add(command.name);
                break;
            case "read":
                if(!setVars.has(command.name) && !scopeHasVariable(command.scope, command.name)) {
                    context.report({
                        message: "Variable {{ name }} is not set before usage",
                        data: {
                            name: command.name
                        },
                        node: command.node
                    });
                }
                break;
            default:
                //Nothing
            }
        }
        for(const argument of arguments_) {
            setVars.delete(argument);
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
                    type: "call",
                    name: node.callee.name,
                    node,
                    scope: context.getScope()
                });
            },
            "FunctionExpression"(node) {
                currentFunc = node.parent.left.name;
                functions[currentFunc] = {
                    commands: [],
                    node
                };
            },
            "FunctionExpression Identifier"(node) {
                const info = functions[currentFunc];
                // Assignments and arguments are writes.
                if((node.parent.type === "AssignmentExpression" && node.parent.left === node) || node.parent.type === "FunctionExpression") {
                    info.commands.push({
                        type: "write",
                        name: node.name,
                        node,
                        arg: node.parent.type === "FunctionExpression"
                    });
                }
                else if(node.parent.type !== "CallExpression") {
                    info.commands.push({
                        type: "read",
                        name: node.name,
                        node,
                        scope: context.getScope()
                    });
                }
            },
            "FunctionExpression:exit"() {
                currentFunc = undefined;
            },
            'Program:exit'() {
                const setVars = new Set(),
                    calledFuncs = new Set();
                for(const entryPoint of api.entrypoints) {
                    if(functions.hasOwnProperty(entryPoint)) {
                        walkFunction(entryPoint, functions, setVars, context, calledFuncs);
                    }
                }
            }
        };
    },
    meta: {
        description: "Check if all variables are set before usage",
        schema: [],
        type: "suggestion"
    }
};
