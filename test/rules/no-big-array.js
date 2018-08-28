import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/no-big-array';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('no-big-array', rule, {
    valid: [
        'array1[99] = "a";',
        'temp = array1[101]'
    ].concat(pnoexz.scripts, pnoexz.functions, pnoexz.bodies),
    invalid: [ {
        code: 'array1[101] = "a"',
        errors: [ {
            message: "Can only assign items to indexes between 0 and 99",
            column: 8,
            line: 1
        } ]
    } ]
});
