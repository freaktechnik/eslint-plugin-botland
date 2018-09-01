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
    valid: [
        'update = function() {};',
        `update = function() {
            array1 = [];
        };`,
        `string = array1[0];
func(string);`,
        'entity.x',
        'entity.y',
        'entity.life',
        'something(entity.x + 0)',
        'something(entity.y + 0)',
        'something(entity.life + 0)',
        'if(typeof a === "string") {}',
        'init = function() { return void a(); };'
    ].concat(pnoexz.scripts, pnoexz.functions, pnoexz.bodies),
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
        },
        {
            code: '[]',
            errors: [ {
                message: "ArrayExpression is not supported",
                column: 1,
                line: 1
            } ]
        },
        {
            code: '({})',
            errors: [ {
                message: "ObjectExpression is not supported",
                column: 2,
                line: 1
            } ]
        },
        {
            code: 'something.method()',
            errors: [ {
                message: "MemberExpression is not supported",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'func(array1[0])',
            errors: [ {
                message: "MemberExpression is not supported",
                column: 6,
                line: 1
            } ]
        },
        {
            code: 'array1 = [ 0 ]',
            errors: [ {
                message: "Can not initialize array when declaring",
                columnd: 10,
                line: 1
            } ]
        },
        {
            code: 'for(a of array1) {}',
            errors: [ {
                message: "ForOfStatement is not supported",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'for(a in array1) {}',
            errors: [ {
                message: "ForInStatement is not supported",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'while(true) {}',
            errors: [ {
                message: "WhileStatement is not supported",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'with(true) {}',
            errors: [ {
                message: "WithStatement is not supported",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'Label: func()',
            errors: [ {
                message: "LabeledStatement is not supported",
                column: 1,
                line: 1
            } ]
        },
        {
            code: `switch(test) {}`,
            errors: [ {
                message: "SwitchStatement is not supported",
                column: 1,
                line: 1
            } ]
        },
        {
            code: 'for(i = 0; i < 10; ++i) { break; }',
            errors: [ {
                message: "BreakStatement is not supported",
                column: 27,
                line: 1
            } ]
        },
        {
            code: 'for(i = 0; i < 10; ++i) { continue; }',
            errors: [ {
                message: "ContinueStatement is not supported",
                column: 27,
                line: 1
            } ]
        },
        {
            code: 'func(entity.x)',
            errors: [ {
                message: "MemberExpression is not supported",
                column: 6,
                line: 1
            } ]
        },
        {
            code: 'func(entity.y)',
            errors: [ {
                message: "MemberExpression is not supported",
                column: 6,
                line: 1
            } ]
        },
        {
            code: 'func(entity.life)',
            errors: [ {
                message: "MemberExpression is not supported",
                column: 6,
                line: 1
            } ]
        },
        {
            code: 'a = function() { delete entity.x; };',
            errors: [ {
                message: "UnaryExpression is not supported",
                column: 18,
                line: 1
            } ]
        },
        {
            code: 'a = function() { void entity.x; };',
            errors: [ {
                message: "UnaryExpression is not supported",
                column: 18,
                line: 1
            } ]
        },
        {
            code: 'a = function() { typeof entity.x; };',
            errors: [ {
                message: "UnaryExpression is not supported",
                column: 18,
                line: 1
            } ]
        },
        {
            code: ';',
            errors: [ {
                message: "EmptyStatement is not supported",
                column: 1,
                line: 1
            } ]
        }
    ]
});
