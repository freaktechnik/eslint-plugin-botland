import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/no-call-entry';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('no-call-entry', rule, {
    valid: [
        'update = function() {};',
        `init = function() {
            help = 'a';
        }`
    ].concat(pnoexz.scripts, pnoexz.functions, pnoexz.bodies),
    invalid: [
        {
            code: 'init()',
            errors: [ {
                message: "Don't call init from your code.",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'update()',
            errors: [ {
                message: "Don't call update from your code.",
                column: 1,
                line: 1
            } ]
        }
    ]
});
