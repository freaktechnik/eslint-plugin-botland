"use strict";

const api = require("../api.json"),
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
            },
            "ObjectExpression": reject,
            "ArrayPattern": reject,
            "ObjectPattern": reject,
            "MemberExpression"(node) {
                if(!node.computed) {
                    reject(node);
                }
            }
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
