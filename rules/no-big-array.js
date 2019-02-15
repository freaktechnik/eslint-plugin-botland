"use strict";

module.exports = {
    create(context) {
        return {
            "AssignmentExpression > MemberExpression[computed=true] > Literal:matches([value<0],[value>99])"(node) {
                if(node.parent == node.parent.parent.left) {
                    context.report({
                        node,
                        messageId: "arraySize"
                    });
                }
            }
            //TODO also look for loops with too big bounds (needs value resolution)
        };
    },
    meta: {
        docs: {
            description: "Custom arrays can at most have 100 items",
            recommended: true
        },
        schema: [],
        messages: {
            arraySize: "Can only assign items to indexes between 0 and 99"
        },
        type: "problem"
    }
};
