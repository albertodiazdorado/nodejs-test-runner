import { test } from 'node:test';
import assert from 'assert';
import { add, subtract, multiply, divide, factorial } from './math-utils.js';

test('add', () => {
  assert.strictEqual(add(1, 2), 3);
});

test('subtract', () => {
  assert.strictEqual(subtract(5, 3), 2);
});

test('multiply', () => {
  assert.strictEqual(multiply(2, 3), 6);
});

test('divide', () => {
  assert.strictEqual(divide(6, 2), 3);
  assert.throws(() => divide(6, 0), /Cannot divide by zero/);
});

test('factorial', () => {
  assert.strictEqual(factorial(5), 120);
  assert.throws(() => factorial(-1), /Cannot calculate factorial of a negative number/);
});
