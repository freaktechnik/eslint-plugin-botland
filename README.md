# eslint-plugin-botland

[![Build Status](https://travis-ci.com/freaktechnik/eslint-plugin-botland.svg?branch=master)](https://travis-ci.com/freaktechnik/eslint-plugin-botland) 

Lint your BotLandScript bot scripts for [Bot Land](https://bot.land) using eslint.

## Rules

- `code-length`
  Bot Land scripts can at most have 16500 characters
- `entry-point`
  Check that the script has the required `update` function. Marks all entry points as used.
- `no-args-in-entry-point`
  Entry points get passed no arguments.
- `no-big-array`
  Items on arrays can only be assigned to indexes between 0 and 99.
- `no-code-after-terminator`
  Warn about code after terminators, since it may not always be reached.
- `no-terminator-in-init`
  Terminators in the init entry point are a no-op.
- `no-unreachable-code`
  Check for code that is never reached via entry points.
- `no-unset`
  Check for variables to be set when read and functions to be defined on the top level scope.
- `no-unsupported-syntax`
  Check for unsupported JS syntax features.
- `no-terminator-expression`
  Terminators must always be a statement on their own line.
- `no-call-entry`
  Don't manually invoke entry points.
- `only-global-function-declaration`
  Top level code must be function declarations and function declarations must be on the top level.
- `prefer-anything`
  Prefer the shorter `ANYTHING` over its equivalent `CPU | BOT | CHIP`.
- `prefer-function`
  Enforce function name to use for aliased functions. Can take an option object with two properties: `exclude` and `prefer`. Both take an array of strings. Functions listed in `exclude` are ignored by the rule. Functions listed in `prefer` are preferred over the default name of the function.
- `use-array-variables`
  There are two special variables in Bot Land, `array1` and `array2` to access and mutate arrays. Arrays can not be interacted with in any other way.

### Future rules to add

- `arg-types` Check argument count and types for methods. Should at the very least
  be able to check number of args, type of literals and direction literals.
- `string-length` `debugLog` strings can at most have 50 characters.
- `no-nan-in-init` warns about `getX`/`getY` resp. `entity.x`/`entity.y` being `NaN` inside the `init` code path.
- `no-reassign-loopvar-in-call` warns about loop variables being reset in a function called within the loop.
- `prefer-find-entities` prefer (or not) `findEntities` over `findClosest*` functions.

## Configs

- `recommended`
  Adds all the global functions and variables of Bot Land so eslint doesn't complain
  about them, removes all the ECMA Script globals and adds the following rules:

  | Rule                               | Level   | Fixable |
  |------------------------------------|---------|---------|
  | `code-length`                      | error   | No      |
  | `entry-point`                      | error   | No      |
  | `no-unsupported-syntax`            | error   | No      |
  | `only-global-function-declaration` | error   | No      |
  | `use-array-variables`              | error   | No      |
  | `no-big-array`                     | error   | No      |
  | `no-unset`                         | error   | No      |
  | `no-unreachable-code`              | error   | No      |
  | `no-terminator-expression`         | error   | No      |
  | `no-call-entry`                    | error   | No      |
  | `no-terminator-in-init`            | warning | No      |
  | `prefer-function`                  | warning | Yes     |
  | `no-code-after-terminator`         | warning | No      |
  | `prefer-anything`                  | warning | Yes     |
