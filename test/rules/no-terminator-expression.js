import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/no-terminator-expression';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('no-termiantor-expression', rule, {
    valid: [ `update = function() {
    fireLasers();
}` ].concat(pnoexz.scripts, pnoexz.functions, pnoexz.bodies),
    invalid: [
        {
            code: `update = function() {
    a = fireLasers();
}`,
            errors: [ {
                message: "Terminators must always be a statement on their own line",
                column: 9,
                line: 2
            } ]
        },
        {
            code: `update = function() {
    a = fireLasers() || init();
}`,
            errors: [ {
                message: "Terminators must always be a statement on their own line",
                column: 9,
                line: 2
            } ]
        }
    ]
});
