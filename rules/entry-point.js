"use strict";

const api = require("../api.json");

module.exports = {
    create(context) {
        return {
            'Program'(node) {
                const entries = new Set();
                for(const statement of node.body) {
                    if(statement.type === "ExpressionStatement" &&
                       statement.expression.type === "AssignmentExpression" &&
                       statement.expression.operator === "=" &&
                       statement.expression.left.type === "Identifier" &&
                       statement.expression.right.type === "FunctionExpression") {
                        if(api.requiredEntry.includes(statement.expression.left.name)) {
                            entries.add(statement.expression.left.name);
                        }
                        if(api.entrypoints.includes(statement.expression.left.name)) {
                            context.markVariableAsUsed(statement.expression.left.name);
                        }
                    }
                }
                for(const entry of api.requiredEntry) {
                    if(!entries.has(entry)) {
                        context.report({
                            node,
                            message: `Must have an ${entry} entry point`
                        });
                    }
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Ensures the required turn entry point exists and is a function. Also marks entry points as used variables.",
            recommended: true
        },
        schema: []
    }
};
