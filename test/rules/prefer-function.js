import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/prefer-function';
import pnoexz from '../_pnoexz';

const ruleTester = new AvaRuleTester(test, {});

ruleTester.run('prefer-function', rule, {
    valid: [
        'canMove()',
        'randInt()',
        'exists()',
        'getDistanceTo()',
        'canSenseEntity()',
        'EMP()',
        'canEMP()',
        'size()'
    ].concat(pnoexz.scripts),
    invalid: [
        {
            code: 'willMoveWork()',
            errors: [ {
                message: "Prefer canMove over willMoveWork",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'randomInteger()',
            errors: [ {
                message: "Prefer randInt over randomInteger",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'isDefined()',
            errors: [ {
                message: "Prefer exists over isDefined",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'distanceTo()',
            errors: [ {
                message: "Prefer getDistanceTo over distanceTo",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'pursueBot()',
            errors: [ {
                message: "Prefer moveTo over pursueBot",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'pursue()',
            errors: [ {
                message: "Prefer moveTo over pursue",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'canSense()',
            errors: [ {
                message: "Prefer canSenseEntity over canSense",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'emp()',
            errors: [ {
                message: "Prefer EMP over emp",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'canEmp()',
            errors: [ {
                message: "Prefer canEMP over canEmp",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'count()',
            errors: [ {
                message: "Prefer size over count",
                column: 1,
                line: 1
            } ]
        }
    ]
});
