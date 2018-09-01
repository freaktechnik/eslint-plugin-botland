"use strict";

const api = require("../api.json"),
    EMPTY = 0,
    rejectNode = (context) => (node) => {
        context.report({
            node,
            message: `${node.type} is not supported`
        });
    };

module.exports = {
    create(context) {
        const reject = rejectNode(context);
        return {
            "ArrowFunctionExpression": reject,
            "ClassExpression": reject,
            "TaggedTemplateExpression": reject,
            "Super": reject,
            "MetaProperty": reject,
            "NewExpression": reject,
            "Import": reject,
            "SpreadElement": reject,
            "AwaitExpression": reject,
            "YieldExpression": reject,
            "DebuggerStatement": reject,
            "ClassDeclaration": reject,
            "FunctionDeclaration": reject,
            "FunctionExpression"(node) {
                if(node.async || node.generator) {
                    context.report({
                        node,
                        message: "Async and generator functions are not supported"
                    });
                }
            },
            "TryStatement": reject,
            "VariableDeclaration": reject,
            "ImportDeclaration": reject,
            "ExportDeclaration": reject,
            "ArrayExpression"(node) {
                if(node.parent.type !== "CallExpression" &&
                   (node.parent.type !== "AssignmentExpression" ||
                    node.parent.left.type !== "Identifier" ||
                    !api.arrayVars.includes(node.parent.left.name))) {
                    reject(node);
                }
                else if(node.parent.type === "AssignmentExpression" &&
                        node.elements.length > EMPTY) {
                    context.report({
                        node,
                        message: "Can not initialize array when declaring"
                    });
                }
            },
            "ObjectExpression": reject,
            "ArrayPattern": reject,
            "ObjectPattern": reject,
            "MemberExpression"(node) {
                if(!node.computed && !api.allowedMembers.includes(node.property.name)) {
                    reject(node);
                }
            },
            "CallExpression > MemberExpression"(node) {
                // non-computed expressions are already covered
                if(node.computed || api.allowedMembers.includes(node.property.name)) {
                    reject(node);
                }
            },
            "ForOfStatement": reject,
            "ForInStatement": reject,
            "WhileStatement": reject,
            "WithStatement": reject,
            "SwitchStatement": reject,
            "LabeledStatement": reject,
            "ContinueStatement": reject,
            "BreakStatement": reject,
            'BlockStatement > ExpressionStatement > UnaryExpression:not([operator="delete"])': reject,
            "EmptyStatement": reject,
            'UnaryExpression[operator="delete"]': reject
        };
    },
    meta: {
        docs: {
            description: "Bot Land only supports a sub-set of JS syntax",
            recommended: true
        },
        schema: []
    }
};
