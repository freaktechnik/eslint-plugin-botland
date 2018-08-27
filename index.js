"use strict";

module.exports = {
    rules: {
        //"no-unreachable-code": require("./rules/no-unreachable-code"), no code in a block after a terminator
        //"arg-types": require("./rules/arg-types"), rundimentary arugments check (count and types)
        //"use-guarded-terminator": require("./rules/use-guarded-terminator"), terminators must have an if around them
        //"no-naughty-array-creation"
        //"use-array-variables"
        "only-global-function-declaration": require("./rules/only-global-function-declaration"),
        "prefer-function": require("./rules/prefer-function"),
        "no-terminator-in-init": require("./rules/no-terminator-in-init"),
        "no-unsupported-syntax": require("./rules/no-unsupported-syntax"),
        "entry-point": require("./rules/entry-point")
    },
    configs: {
        recommended: require("./configs/recommended")
    }
};
