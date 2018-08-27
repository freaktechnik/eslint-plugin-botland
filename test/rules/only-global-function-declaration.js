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
                message: "Top level statements must be function declarations",
                column: 8,
                line: 1
            } ]
        },
        {
            code: 'function update() {}',
            errors: [ {
                message: "Top level statements must be function declarations",
                column: 1,
                line: 1
            } ]
        },
        {
            code: '(function() { update = function() {}; })()',
            errors: [ {
                message: "Top level statements must be function declarations",
                column: 1,
                line: 1
            } ]
        },
        {
            code: '"a"',
            errors: [ {
                message: "Top level statements must be function declarations",
                column: 1,
                line: 1
            } ]
        }
    ]
});
