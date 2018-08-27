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
                       api.requiredEntry.includes(statement.expression.left.name) &&
                       statement.expression.right.type === "FunctionExpression") {
                        entries.add(statement.expression.left.name)
                        break;
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
            description: "Ensures the required turn entry point exists and is a function",
            recommended: true
        },
        schema: []
    }
};
