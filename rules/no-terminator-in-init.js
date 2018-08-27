"use strict";

const api = require("../api.json"),

    walkBodies = (node, cbk) => {
        if(node.type === "FunctionExpression" || node.type === "WhileStatement") {
            if(node.test) {
                walkBodies(node.test, cbk);
            }
            walkBodies(node.body, cbk);
        }
        else if(node.type === "FunctionBody" || node.type === "BlockStatement") {
            for(const n of node.body) {
                walkBodies(n, cbk);
            }
        }
        else if(node.type === "ExpressionStatement") {
            return walkBodies(node.expression, cbk);
        }
        else if(node.type === "SwitchStatement") {
            walkBodies(node.discriminant, cbk);
            for(const n of node.cases) {
                walkBodies(n, cbk);
            }
        }
        else if(node.type === "SwitchCase") {
            walkBodies(node.test, cbk);
            for(const n of node.consequent) {
                walkBodies(n, cbk);
            }
        }
        else if(node.type === "IfStatement") {
            walkBodies(node.test, cbk);
            walkBodies(node.consequent, cbk);
            if(node.alternate) {
                walkBodies(node.alternate, cbk);
            }
        }
        else if(node.type === "CallExpression") {
            cbk(node);
        }
    };

module.exports = {
    create(context) {
        return {
            'Program ExpressionStatement > AssignmentExpression[operator="="]'(node) {
                if(node.left.type === "Identifier" &&
                   node.left.name === "init" &&
                   node.right.type === "FunctionExpression") {
                    walkBodies(node.right, (hit) => {
                        if(hit.callee.type === "Identifier" &&
                           api.terminators.includes(hit.callee.name)) {
                            context.report({
                                node: hit,
                                message: "Terminators in the init entry point have no effect"
                            });
                        }
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Terminators in the init entry-point are a no-op",
            recommended: true
        },
        schema: []
    }
};
