"use strict";

const api = require("../api.json");

module.exports = {
    create(context) {
        return {
            'CallExpression'(node) {
                if(api.entrypoints.includes(node.callee.name)) {
                    context.report({
                        node,
                        message: "Don't call {{ name }} from your code.",
                        data: {
                            name: node.callee.name
                        }
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Don't manually invoke entry points",
            recommended: true
        },
        schema: [],
        type: "suggestion"
    }
};
