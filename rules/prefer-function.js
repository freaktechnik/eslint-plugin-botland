"use strict";

const api = require("../api.json");

//TODO make auto fixable

module.exports = {
    create(context) {
        const [ {
                exclude = [],
                prefer = []
            } = {} ] = context.options,
            preferred = {};
        for(const o of prefer) {
            if(o in api.aliases) {
                preferred[api.aliases[o]] = o;
            }
        }
        for(const a in api.aliases) {
            if(!exclude.includes(a)) {
                if(api.aliases[a] in preferred) {
                    preferred[a] = preferred[api.aliases[a]];
                }
                else {
                    preferred[a] = api.aliases[a];
                }
            }
        }
        const aliases = Object.keys(preferred);
        return {
            "CallExpression"(node) {
                if(aliases.includes(node.callee.name)) {
                    context.report({
                        node,
                        message: 'Prefer {{ preferred }} over {{ used }}',
                        data: {
                            preferred: preferred[node.callee.name],
                            used: node.callee.name
                        },
                        fix(fixer) {
                            return fixer.replaceText(node.callee, preferred[node.callee.name]);
                        }
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Prefer unaliased versions of functions over their aliased counterpart",
            recommended: true
        },
        schema: [ {
            type: "object",
            properties: {
                exclude: {
                    type: "array",
                    values: {
                        oneOf: api.functions.concat(api.terminators)
                    }
                },
                prefer: {
                    type: "array",
                    values: {
                        oneOf: Object.keys(api.aliases)
                    }
                }
            },
            additionalProperties: false
        } ],
        type: "suggestion",
        fixable: "code"
    }
};
