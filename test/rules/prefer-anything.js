import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/prefer-anything';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('prefer-anything', rule, {
    valid: [
        'findEntities(ALLY, BOT, false)',
        'findEntities(ALLY, BOT | CHIP, false)',
        'findEntities(ALLY, BOT | CPU, false)',
        'findEntities(ALLY, CPU, false)',
        'findEntities(ALLY, CPU | CHIP, false)',
        'findEntities(ALLY, CHIP, false)',
        'findEntities(ALLY, ANYTHING, false)',
        'BOT | 0',
        'findEntities(ALLY, CPU | BOT | size("CHIP"), false)'
    ].concat(pnoexz.scripts, pnoexz.functions, pnoexz.bodies),
    invalid: [
        {
            code: 'findEntities(ALLY, BOT | CHIP | CPU, false)',
            errors: [ {
                message: "Prefer ANYTHING over combining all entity types",
                column: 20,
                line: 1
            } ],
            output: 'findEntities(ALLY, ANYTHING, false)'
        },
        {
            code: 'findEntities(ALLY, CHIP|BOT|CPU, false)',
            errors: [ {
                message: "Prefer ANYTHING over combining all entity types",
                column: 20,
                line: 1
            } ],
            output: 'findEntities(ALLY, ANYTHING, false)'
        },
        {
            code: 'findEntities(ALLY, ANYTHING | CPU, false)',
            errors: [ {
                message: "ANYTHING includes all entity types",
                column: 20,
                line: 1
            } ],
            output: 'findEntities(ALLY, ANYTHING, false)'
        },
        {
            code: 'findEntities(ALLY, CPU | CPU | BOT | CHIP, false)',
            errors: [ {
                message: "Prefer ANYTHING over combining all entity types",
                column: 20,
                line: 1
            } ],
            output: 'findEntities(ALLY, ANYTHING, false)'
        }
    ]
});
