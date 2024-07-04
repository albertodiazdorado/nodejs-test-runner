export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

export function factorial(n) {
  if (n < 0) {
    throw new Error("Cannot calculate factorial of a negative number");
  }
  return n === 0 ? 1 : n * factorial(n - 1);
}
