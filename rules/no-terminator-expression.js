"use strict";

const api = require("../api.json");

module.exports = {
    create(context) {
        return {
            '*:not(ExpressionStatement) > CallExpression'(node) {
                if(api.terminators.includes(node.callee.name)) {
                    context.report({
                        node,
                        message: "Terminators must always be a statement on their own line"
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Terminators must be a statement",
            recommended: true
        },
        schema: [],
        type: "problem"
    }
};
