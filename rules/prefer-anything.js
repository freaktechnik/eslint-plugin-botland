"use strict";

const api = require("../api.json"),

    getIdentifiers = (node) => {
        if(node.type === "BinaryExpression") {
            return [
                ...getIdentifiers(node.left),
                ...getIdentifiers(node.right)
            ];
        }
        else if(node.type === "Identifier") {
            return [ node.name ];
        }
        return [];
    };

module.exports = {
    create(context) {
        const ANYTHING = "ANYTHING",
            NOT_ANYTHING = api.globals.entityType.filter((t) => t !== "ANYTHING");
        return {
            "BinaryExpression[operator=\"|\"]"(node) {
                if((node.left.type === "Identifier" && node.left.name === ANYTHING) ||
                    (node.right.type === "Identifier" && node.right.name === ANYTHING)) {
                    context.report({
                        node,
                        message: 'ANYTHING includes all entity types',
                        fix(fixer) {
                            return fixer.replaceText(node, ANYTHING);
                        }
                    });
                }
            },
            'BinaryExpression[operator="|"] > BinaryExpression[operator="|"]'(node) {
                //TODO ignore falsy values?
                const existingIdentifiers = getIdentifiers(node.parent);
                if(NOT_ANYTHING.every((t) => existingIdentifiers.includes(t)) && existingIdentifiers.every((i) => NOT_ANYTHING.includes(i))) {
                    context.report({
                        node: node.parent,
                        message: 'Prefer ANYTHING over combining all entity types',
                        fix(fixer) {
                            return fixer.replaceText(node.parent, ANYTHING);
                        }
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Prefer ANYTHING over combining entity types",
            recommended: true
        },
        type: "suggestion",
        fixable: "code"
    }
};
