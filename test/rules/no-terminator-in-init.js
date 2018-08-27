import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/no-terminator-in-init';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('no-terminator-in-init', rule, {
    valid: [
        'update = function() {};',
        `init = function() {
            help = 'a';
        }`
    ].concat(pnoexz.scripts),
    invalid: [
        {
            code: 'init = function() { zap(); };',
            errors: [ {
                message: "Terminators in the init entry point have no effect",
                column: 21,
                line: 1
            } ]
        }
    ]
});
