"use strict";

module.exports = {
    rules: {
        "no-code-after-terminator": require("./rules/no-code-after-terminator"),
        //"arg-types": require("./rules/arg-types"), rundimentary arugments check (count and types)
        //"use-guarded-terminator": require("./rules/use-guarded-terminator"), terminators must have an if around them
        "no-args-in-entry-point": require("./rules/no-args-in-entry-point"),
        "no-unreachable-code": require("./rules/no-unreachable-code"),
        "no-unset": require("./rules/no-unset"),
        "no-big-array": require("./rules/no-big-array"),
        "code-length": require("./rules/code-length"),
        "use-array-variables": require("./rules/use-array-variables"),
        "only-global-function-declaration": require("./rules/only-global-function-declaration"),
        "prefer-function": require("./rules/prefer-function"),
        "no-terminator-in-init": require("./rules/no-terminator-in-init"),
        "no-unsupported-syntax": require("./rules/no-unsupported-syntax"),
        "entry-point": require("./rules/entry-point"),
        "no-terminator-expression": require("./rules/no-terminator-expression"),
        "no-call-entry": require("./rules/no-call-entry"),
        "prefer-anything": require("./rules/prefer-anything")
    },
    configs: {
        recommended: require("./configs/recommended")
    }
};
