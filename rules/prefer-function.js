"use strict";

const api = require("../api.json");

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
                //TODO honor prefer mappings
                if(aliases.includes(node.callee.name)) {
                    context.report({
                        node,
                        message: `Prefer ${preferred[node.callee.name]} over ${node.callee.name}`
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
        } ]
    }
};
