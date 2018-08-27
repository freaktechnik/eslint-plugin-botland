"use strict";

const MAX_LENGTH = 15000;

module.exports = {
    create(context) {
        const source = context.getSourceCode().getText();
        return {
            'Program'(node) {
                if(source.length > MAX_LENGTH) {
                    context.report({
                        node,
                        message: `Script has ${source.length} characters out of ${MAX_LENGTH} allowed characters`
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Ensures the required turn entry point exists and is a function. Also marks entry points as used variables.",
            recommended: true
        },
        schema: []
    }
};
