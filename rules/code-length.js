"use strict";

const MAX_LENGTH = 16500;

module.exports = {
    create(context) {
        const source = context.getSourceCode().getText();
        return {
            'Program'(node) {
                if(source.length > MAX_LENGTH) {
                    context.report({
                        node,
                        message: 'Script has {{ sourceLength }} characters out of {{ maxLength }} allowed characters',
                        data: {
                            sourceLength: source.length,
                            maxLength: MAX_LENGTH
                        }
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            description: "Checks the length of the script to be storeable by Bot Land",
            recommended: true
        },
        schema: [],
        type: "problem"
    }
};
