"use strict";

const api = require("../api.json");

module.exports = {
    create(context) {
        return {
            'AssignmentExpression:not(:matches([right.type="Identifier"],[right.type="ArrayExpression"],[right.type="CallExpression"])) > Identifier'(node) {
                if(api.arrayVars.includes(node.name) &&
                   (node.parent.right.type !== 'Literal' ||
                    typeof node.parent.right.value !== 'string')) {
                    context.report({
                        node: node.parent.right,
                        message: "Only assign arrays or strings to array variables"
                    });
                }
            },
            "MemberExpression"(node) {
                if(!api.arrayVars.includes(node.object.name)) {
                    context.report({
                        node: node.object,
                        message: "Arrays can only be read and written to and from array variables"
                    });
                }
                else if((node.property.type !== "Literal" ||
                         typeof node.property.value !== "number") &&
                        node.property.type !== "Identifier") {
                    //TODO try to get type of identifier
                    context.report({
                        node: node.property,
                        message: "Property accessor must be a number literal or variable"
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
        schema: []
    }
};
