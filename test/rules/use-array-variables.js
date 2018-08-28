import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/use-array-variables';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('use-array-variables', rule, {
    valid: [
        'array1[1]',
        'array1[test]',
        'array2[1] = "hi"',
        'array2[0] = test',
        'array1 = []',
        'array1 = "hi"'
    ].concat(pnoexz.scripts, pnoexz.bodies, pnoexz.functions),
    invalid: [
        {
            code: 'someVar[1]',
            errors: [ {
                messageId: "arrayWrite",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'someVar[1] = 1',
            errors: [ {
                messageId: "arrayWrite",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'array2["a"]',
            errors: [ {
                messageId: "arrayAccessorNumber",
                column: 8,
                line: 1
            } ]
        },
        {
            code: 'array1 = 1;',
            errors: [ {
                messageOd: "assignType",
                column: 10,
                line: 1
            } ]
        }
    ]
});
