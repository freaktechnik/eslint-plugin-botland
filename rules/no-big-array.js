"use strict";

module.exports = {
    create(context) {
        return {
            "AssignmentExpression > MemberExpression[computed=true] > Literal:matches([value<0],[value>99])"(node) {
                if(node.parent == node.parent.parent.left) {
                    context.report({
                        node,
                        message: "Can only assign items to indexes between 0 and 99"
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Custom arrays can at most have 100 items",
            recommended: true
        },
        schema: []
    }
};
