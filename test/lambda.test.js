/* eslint-disable new-cap */
import test from 'ava';
import lambda from '../src';
import context from 'aws-lambda-mock-context';

const data = {
    value: 'test data'
};

test('Function should pass', async t => {
    const ctx = context();
    lambda(data, ctx);
    t.is(await ctx.Promise, data.value.toUpperCase());
});

test('Function should fail', async t => {
    const ctx = context();
    lambda(data, ctx);
    t.not(await ctx.Promise, data.value);
});
