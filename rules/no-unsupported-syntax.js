"use strict";

const rejectNode = (context) => (node) => {
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
            "ExportDeclaration": reject
        };
    }
};
