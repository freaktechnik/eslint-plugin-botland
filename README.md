# eslint-plugin-botland

[![Build Status](https://travis-ci.com/freaktechnik/eslint-plugin-botland.svg?branch=master)](https://travis-ci.com/freaktechnik/eslint-plugin-botland)

Lint your [Bot Land](https://bot.land) bot scripts using eslint.

## Rules
- `entry-point`
  Checks that the script has the required `update` function.
- `no-unsupported-syntax`
  Checks for unsupported JS syntax features.
- `no-terminator-in-init`
  Terminators in the init entry point are a no-op.

## Configs
- `recommended`
  Adds all the global functions and variables Bot Land so eslint doesn't complain
  about them and adds the following rules:

  | Rule | Level |
  |------|-------|
  | `entry-point` | error |
  | `no-unsupported-syntax` | error |
  | `no-terminator-in-init` | warning |
