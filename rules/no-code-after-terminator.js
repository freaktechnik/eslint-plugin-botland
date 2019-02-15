"use strict";

const api = require("../api.json");

module.exports = {
    create(context) {
        return {
            "BlockStatement > ExpressionStatement:not(:last-child) CallExpression, IfStatement CallExpression.test, ForStatement CallExpression.test"(node) {
                if(api.terminators.includes(node.callee.name)) {
                    context.report({
                        node,
                        loc: {
                            start: node.loc.end,
                            end: node.parent.loc.end
                        },
                        messageId: "unreachableCode"
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Code after a terminator is not executed when the terminator is successful.",
            recommended: true
        },
        schema: [],
        messages: {
            unreachableCode: "Code can not be reached when terminator executes"
        },
        type: "suggestion"
    }
};
