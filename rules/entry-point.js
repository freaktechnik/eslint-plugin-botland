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
                       statement.expression.right.type === "FunctionExpression" &&
                       api.requiredEntry.includes(statement.expression.left.name)) {
                        entries.add(statement.expression.left.name);
                        break;
                    }
                }
                for(const entry of api.requiredEntry) {
                    if(!entries.has(entry)) {
                        context.report({
                            node,
                            message: 'Must have an {{ entry }} entry point',
                            data: {
                                entry
                            }
                        });
                    }
                }
            },
            "Program > ExpressionStatement > AssignmentExpression[operator=\"=\"][right.type=\"FunctionExpression\"] > Identifier.left"(node) {
                if(api.entrypoints.includes(node.name)) {
                    context.markVariableAsUsed(node.name);
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
