import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/no-unsupported-syntax';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {
    parserOptions: {
        ecmaVersion: 2017
    }
});

ruleTester.run('no-unsupported-syntax', rule, {
    valid: [ 'update = function() {};' ].concat(pnoexz.scripts, pnoexz.functions, pnoexz.bodies),
    invalid: [
        {
            code: 'init = function*() {};',
            errors: [ {
                message: "Async and generator functions are not supported",
                column: 8,
                line: 1
            } ]
        },
        {
            code: 'init = async function() {};',
            errors: [ {
                message: "Async and generator functions are not supported",
                column: 8,
                line: 1
            } ]
        },
        {
            code: 'async function update() {}',
            errors: [ {
                message: "FunctionDeclaration is not supported",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'var update = function() {}',
            errors: [ {
                message: "VariableDeclaration is not supported",
                column: 1,
                line: 1
            } ]
        }
    ]
});
