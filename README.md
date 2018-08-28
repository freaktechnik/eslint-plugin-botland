# eslint-plugin-botland

[![Build Status](https://travis-ci.com/freaktechnik/eslint-plugin-botland.svg?branch=master)](https://travis-ci.com/freaktechnik/eslint-plugin-botland)

Lint your [Bot Land](https://bot.land) bot scripts using eslint.

## Rules
- `code-length`
  Bot Land scripts can at most have 15000 characters
- `entry-point`
  Check that the script has the required `update` function. Marks all entry points as used.
- `no-big-array`
  Items on arrays can only be assigned to indexes between 0 and 99.
- `no-terminator-in-init`
  Terminators in the init entry point are a no-op.
- `no-unsupported-syntax`
  Check for unsupported JS syntax features.
- `only-global-function-declaration`
  Top level code must be function declarations and function declarations must be on the top level.
- `prefer-function`
  Enforce function name to use for aliased functions. Can take an option object with two properties: `exclude` and `prefer`. Both take an array of strings. Functions listed in `exclude` are ignored by the rule. Functions listed in `prefer` are preferred over the default name of the function.
- `use-array-variables`
  There are two special variables in Bot Land, `array1` and `array2` to access and mutate arrays. Arrays can not be interacted with in any other way.

### Future rules to add
- `use-guarded-terminator` Terminators should be guarded in an if. Should be able
   to auto fix some terminators by adding the basic canDoX check.
- `no-unreachable-code` No code in blocks after terminators. Synergizes with the
  `use-guarded-terminator` rule, since code after terminators can be reached.
- `arg-types` Check argument count and types for methods. Should at the very least
  be able to check number of args, type of literals and direction literals.
- `no-unassigned`/`no-unset` Check for variables to be set somewhere at some point if they aren't global.
- `string-length` `debugLog` strings can at most have 50 characters.

## Configs
- `recommended`
  Adds all the global functions and variables of Bot Land so eslint doesn't complain
  about them, removes all the ECMA Script globals and adds the following rules:

  | Rule                               | Level   |
  |------------------------------------|---------|
  | `code-length`                      | error   |
  | `entry-point`                      | error   |
  | `no-unsupported-syntax`            | error   |
  | `only-global-function-declaration` | error   |
  | `use-array-variables`              | error   |
  | `no-big-array`                     | error   |
  | `no-terminator-in-init`            | warning |
  | `prefer-function`                  | warning |
