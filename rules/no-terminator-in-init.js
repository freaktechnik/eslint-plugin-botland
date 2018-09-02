"use strict";

const api = require("../api.json");

module.exports = {
    create(context) {
        return {
            'Program ExpressionStatement > AssignmentExpression[operator="="][left.type="Identifier"][left.name="init"][right.type="FunctionExpression"] CallExpression'(node) {
                if(node.callee.type === "Identifier" &&
                   api.terminators.includes(node.callee.name)) {
                    context.report({
                        node,
                        message: "Terminators in the init entry point have no effect"
                    });
                }
                //TODO else check out body of function that is called for terminators
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
