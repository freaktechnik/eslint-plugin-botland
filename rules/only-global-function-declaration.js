"use strict";

module.exports = {
    create(context) {
        return {
            'Program > *:not([type="ExpressionStatement"][expression.type="AssignmentExpression"][expression.operator="="][expression.left.type="Identifier"][expression.right.type="FunctionExpression"])'(node) {
                let problematicNode;
                if(node.type !== "ExpressionStatement") {
                    problematicNode = node;
                }
                else if(node.expression.type !== "AssignmentExpression" ||
                    node.expression.operator !== "=") {
                    problematicNode = node.expression;
                }
                else if(node.expression.left.type !== "Identifier") {
                    problematicNode = node.expression.left;
                }
                else if(node.expression.right.type !== "FunctionExpression") {
                    problematicNode = node.expression.right;
                }
                if(problematicNode) {
                    context.report({
                        node: problematicNode,
                        message: "Top level statements must be function declarations"
                    });
                }
            },
            "FunctionExpression FunctionExpression"(node) {
                context.report({
                    node,
                    message: "Function declarations may not be nested"
                });
            }
        };
    },
    meta: {
        docs: {
            description: "Only function declarations are allowed on the top level.",
            recommended: true
        },
        schema: []
    }
};
