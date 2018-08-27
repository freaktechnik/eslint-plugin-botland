# eslint-plugin-botland

Lint your [Bot Land](https://bot.land) bot scripts using eslint.

## Rules
- `entry-point`
  Checks that the script has the required `update` function.
- `no-unsupported-syntax`
  Checks for unsupported JS syntax features.

## Configs
- `recommended`
  Adds all the global functions and variables Bot Land so eslint doesn't complain
  about them and adds the following rules:

  | Rule | Level |
  ----------------
  | `entry-point` | error |
  | `no-unsupported-syntax` | error |
