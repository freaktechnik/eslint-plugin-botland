import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/code-length';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('code-length', rule, {
    valid: [
        'update = function() {};',
        `init = function() {
            help = 'a';
        }`
    ].concat(pnoexz.scripts, pnoexz.functions, pnoexz.bodies),
    invalid: [ {
        code: 'a'.repeat(15001),
        errors: [ {
            message: "Script has 15001 characters out of 15000 allowed characters",
            column: 1,
            line: 1
        } ]
    } ]
});
