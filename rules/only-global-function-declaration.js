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
                        messageId: "topLevelFunction"
                    });
                }
            },
            "FunctionExpression FunctionExpression"(node) {
                context.report({
                    node,
                    messageId: "nestedFunction"
                });
            },
            "FunctionExpression AssignmentExpression"(node) {
                const scope = context.getScope();
                if(scope.upper.references.find((r) => r.identifier.name === node.left.name)) {
                    context.report({
                        node,
                        messageId: "overwriteFunction"
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Only function declarations are allowed on the top level.",
            recommended: true
        },
        schema: [],
        messages: {
            topLevelFunction: "Top level statements must be function declarations",
            nestedFunction: "Function declarations may not be nested",
            overwriteFunction: "Can not assign value to variable that has already been assigned a function"
        }
    }
};
