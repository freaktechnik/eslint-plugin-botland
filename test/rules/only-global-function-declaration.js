import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/only-global-function-declaration';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('only-global-function-declaration', rule, {
    valid: [ 'update = function() {};' ].concat(pnoexz.scripts),
    invalid: [
        {
            code: 'init = 1;',
            errors: [ {
                messageId: "topLevelFunction",
                column: 8,
                line: 1
            } ]
        },
        {
            code: 'function update() {}',
            errors: [ {
                messageId: "topLevelFunction",
                column: 1,
                line: 1
            } ]
        },
        {
            code: '(function() { update = function() {}; })()',
            errors: [
                {
                    messageId: "topLevelFunction",
                    column: 1,
                    line: 1
                },
                {
                    messageId: "nestedFunction",
                    column: 24,
                    line: 1
                }
            ]
        },
        {
            code: '"a"',
            errors: [ {
                messageId: "topLevelFunction",
                column: 1,
                line: 1
            } ]
        },
        {
            code: "a = function() { b = function() {}; };",
            errors: [ {
                messageId: "nestedFunction",
                column: 22,
                line: 1
            } ]
        }
    ]
});
