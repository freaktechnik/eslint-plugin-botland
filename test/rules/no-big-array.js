import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/no-big-array';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('no-big-array', rule, {
    valid: [
        'array1[99] = "a";',
        'temp = array1[101]',
        'array1[99] = array2[101]'
    ].concat(pnoexz.scripts, pnoexz.functions, pnoexz.bodies),
    invalid: [ {
        code: 'array1[101] = "a"',
        errors: [ {
            messageId: "arraySize",
            column: 8,
            line: 1
        } ]
    } ]
});
