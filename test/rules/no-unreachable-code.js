import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/no-unreachable-code';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('no-unreachable-code', rule, {
    valid: [
        'init = function() { figureItOut(); }',
        'update = function () { figureItOut(); }'
    ].concat(pnoexz.scripts),
    invalid: [ {
        code: `init = function() {
figureItOut();
};
unused = function() {
doNothing = true
};`,
        errors: [ {
            message: "Function unused is never called",
            column: 10,
            line: 4
        } ]
    } ]
});
