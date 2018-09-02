"use strict";

module.exports = (node, scope, fallback) => {
    if(node.type === "Literal") {
        return node.value;
    }
    else if(node.type === "Identifier") {
        const reference = scope.references.find((r) => r.identifier.name === node.name && r.writeExpr && r.writeExpr.type === "Literal");
        if(reference) {
            return reference.writeExpr.value;
        }
        //TODO try to resolve arguments
        //TODO return value types from built ins
    }
    return fallback;
};
