import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/no-code-after-terminator';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('no-code-after-terminator', rule, {
    valid: [
        'init = function() { figureItOut(); }',
        'update = function () { test = "1"; figureItOut(); }',
    ].concat(pnoexz.scripts, pnoexz.functions, pnoexz.bodies),
    invalid: [
        {
            code: 'init = function() { figureItOut(); test = "1"; }',
            errors: [ {
                messageId: "unreachableCode",
                column: 34,
                line: 1
            } ]
        },
        {
            code: 'init = function() { if(figureItOut()) { test = "1"; } }',
            errors: [ {
                messageId: "unreachableCode",
                column: 37,
                line: 1
            } ]
        }
    ]
});
