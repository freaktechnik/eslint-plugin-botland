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
        code: 'a'.repeat(16501),
        errors: [ {
            message: "Script has 16501 characters out of 16500 allowed characters",
            column: 1,
            line: 1
        } ]
    } ]
});
