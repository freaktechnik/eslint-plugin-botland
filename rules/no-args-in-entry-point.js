"use strict";

const api = require("../api.json"),
    LAST_ELEMENT = 1;

module.exports = {
    create(context) {
        return {
            "Program > ExpressionStatement > AssignmentExpression[operator=\"=\"][right.type=\"FunctionExpression\"][right.params.length>0] > Identifier.left"(node) {
                if(api.entrypoints.includes(node.name)) {
                    const { params } = node.parent.right,
                        [ firstArgument ] = params,
                        lastArgument = params[params.length - LAST_ELEMENT];
                    context.report({
                        node: node.parent.right,
                        loc: {
                            start: firstArgument.loc.start,
                            end: lastArgument.loc.end
                        },
                        message: "Entry points get no arguments passed in"
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Entry points do not get any arguments",
            recommended: true
        },
        schema: [],
        type: "problem"
    }
};
