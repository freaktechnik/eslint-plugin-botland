import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/no-unset';
import pnoexz from '../_pnoexz';
import recommended from '../../configs/recommended';

const ruleTester = new AvaRuleTester(test, {
    globals: recommended.globals
});

ruleTester.run('no-unset', rule, {
    valid: [ `update = function(test) {
sharedA = test;
}` ].concat(pnoexz.scripts, pnoexz.functions, pnoexz.bodies),
    invalid: [
        {
            code: 'update = function() { test(); }',
            errors: [ {
                message: "Function test must be set in the top level scope before usage",
                column: 23,
                line: 1
            } ]
        },
        {
            code: `update = function() {
    sharedA = test;
}`,
            errors: [ {
                message: "Variable test is not set before usage",
                column: 15,
                line: 2
            } ]
        },
        {
            code: `init = function(test) {
    a = "b";
};
update = function() {
    a = test;
}`,
            errors: [ {
                message: "Variable test is not set before usage",
                column: 9,
                line: 5
            } ]
        }
    ]
});
