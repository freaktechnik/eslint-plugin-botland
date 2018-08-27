import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/entry-point';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('entry-point', rule, {
    valid: [ 'update = function() {};' ].concat(pnoexz.scripts),
    invalid: [
        {
            code: 'init = function() {};',
            errors: [ {
                message: "Must have an update entry point",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'function update() {}',
            errors: [ {
                message: "Must have an update entry point",
                column: 1,
                line: 1
            } ]
        },
        {
            code: '(function() { update = function() {}; })()',
            errors: [ {
                message: "Must have an update entry point",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'update = "a"',
            errors: [ {
                message: "Must have an update entry point",
                column: 1,
                line: 1
            } ]
        }
    ]
});
