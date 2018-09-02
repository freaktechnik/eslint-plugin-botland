"use strict";

const api = require("../api.json");

module.exports = {
    create(context) {
        const calledFuncs = new Set(),
            calledTerminators = {};
        let currentFunc;
        return {
            'Program ExpressionStatement > AssignmentExpression[operator="="][left.type="Identifier"][left.name="init"][right.type="FunctionExpression"] CallExpression'(node) {
                if(node.callee.type === "Identifier" &&
                   api.terminators.includes(node.callee.name)) {
                    context.report({
                        node,
                        message: "Terminators in the init entry point have no effect"
                    });
                }
                else if(!api.functions.includes(node.callee.name)) {
                    calledFuncs.add(node.callee.name);
                }
            },
            'FunctionExpression[parent.left.name!="init"]'(node) {
                currentFunc = node.parent.left.name;
            },
            'FunctionExpression:exit'() {
                currentFunc = undefined;
            },
            'CallExpression'(node) {
                if(currentFunc && api.terminators.includes(node.callee.name)) {
                    if(!calledTerminators.hasOwnProperty(currentFunc)) {
                        calledTerminators[currentFunc] = [];
                    }
                    calledTerminators[currentFunc].push(node);
                }
            },
            'Program:exit'() {
                for(const func of calledFuncs) {
                    if(calledTerminators.hasOwnProperty(func)) {
                        for(const node of calledTerminators[func]) {
                            context.report({
                                node,
                                message: "Terminators within the init entry point code path have no effect"
                            });
                        }
                    }
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Terminators in the init entry-point are a no-op",
            recommended: true
        },
        schema: []
    }
};
