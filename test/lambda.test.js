import test from 'ava';
import lambda from '../src';
import context from 'aws-lambda-mock-context';

const data = {
    value: 'test data'
};

test('Function should pass', t => {
    const ctx = context();
    lambda(data, ctx);
    ctx.Promise
        .then(result => {
            t.true(result === data.value.toUpperCase());
        });
});

test('Function should fail', t => {
    const ctx = context();
    lambda(data, ctx);
    ctx.Promise
        .then(result => {
            t.fail(result === data.value);
        });
});
