"use strict";

const api = require("../api.json");

const scopeHasVariable = (scope, varname) => {
    if(!scope) {
        console.log(varname);
        return false;
    }
    return scope.set.has(varname) || (scope.upper && scopeHasVariable(scope.upper, varname));
};

const walkFunction = (name, functions, setVars, ctx) => {
    const args = new Set();
    for(const command of functions[name].commands) {
        switch(command.type) {
            case "call": {
                if(functions.hasOwnProperty(command.name)) {
                    walkFunction(command.name, functions, setVars, ctx);
                }
                else {
                    // Use scope to also account for globals.
                    if(!scopeHasVariable(command.scope, command.name)) {
                        ctx.report({
                            node: command.node,
                            message: "Function {{ funcName }} must be set in the top level scope before usage",
                            data: {
                                funcName: command.node.callee.name
                            }
                        });
                    }
                }
                break;
            }
            case "write":
                if(command.arg && !setVars.has(command.name)) {
                    args.add(command.name);
                }
                else if(!args.has(command.name) && !command.arg) {
                    args.delete(command.name);
                }
                setVars.add(command.name);
                break;
            case "read": {
                if(!setVars.has(command.name) && !scopeHasVariable(command.scope, command.name)) {
                    ctx.report({
                        message: "Variable {{ name }} is not set before usage",
                        data: {
                            name: command.name
                        },
                        node: command.node
                    });
                }
                break;
            }
        }
    }
    for(const arg of args) {
        setVars.delete(arg);
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
            "FunctionExpression:exit"(node) {
                currentFunc = undefined;
            },
            'Program:exit'(node) {
                const setVars = new Set();
                if(functions.hasOwnProperty("init")) {
                    walkFunction("init", functions, setVars, context);
                }
                if(functions.hasOwnProperty("update")) {
                    walkFunction("update", functions, setVars, context);
                }
            }
        }
    },
    meta: {
        description: "Check if all variables are set before usage",
        schema: []
    }
};
