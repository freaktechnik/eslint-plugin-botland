import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/no-args-in-entry-point';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('no-args-in-entry-point', rule, {
    valid: [ 'update = function() {};' ].concat(pnoexz.scripts),
    invalid: [
        {
            code: 'init = function(asdf) {};',
            errors: [ {
                message: "Entry points get no arguments passed in",
                column: 17,
                line: 1
            } ]
        },
        {
            code: 'update = function(a, b) {};',
            errors: [ {
                message: "Entry points get no arguments passed in",
                column: 19,
                line: 1
            } ]
        },
        {
            code: 'update = function(a, b, c) {};',
            errors: [ {
                message: "Entry points get no arguments passed in",
                column: 19,
                line: 1
            } ]
        }
    ]
});
