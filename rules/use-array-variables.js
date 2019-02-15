"use strict";

const api = require("../api.json"),
    getValue = require("../get-value"),
    DEFAULT_INDEX = 0;

module.exports = {
    create(context) {
        return {
            'AssignmentExpression:not(:matches([right.type="Identifier"],[right.type="ArrayExpression"],[right.type="CallExpression"])) > Identifier'(node) {
                if(api.globals.arrays.includes(node.name) &&
                   (node.parent.right.type !== 'Literal' ||
                    typeof node.parent.right.value !== 'string')) {
                    context.report({
                        node: node.parent.right,
                        messageId: "assignType"
                    });
                }
            },
            "MemberExpression"(node) {
                if(!api.globals.arrays.includes(node.object.name)) {
                    context.report({
                        node: node.object,
                        messageId: "arrayWrite"
                    });
                }
                else if(typeof getValue(node.property, context.getScope(), DEFAULT_INDEX) !== "number") {
                    context.report({
                        node: node.property,
                        messageId: "arrayAccessorNumber"
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Only the two built in array registers can mutate and read arrays",
            recommended: true
        },
        schema: [],
        messages: {
            assignType: "Only assign arrays or strings to array variables",
            arrayWrite: "Arrays can only be read and written to and from array variables",
            arrayAccessorNumber: "Property accessor must be a number literal or variable"
        },
        type: "problem"
    }
};
