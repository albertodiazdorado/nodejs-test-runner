import { describe, it, expect } from "vitest";
import { add, subtract, multiply, divide, factorial } from "./math-utils.js";

describe("mathUtils", () => {
  it("add", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("subtract", () => {
    expect(subtract(5, 3)).toBe(2);
  });

  it("multiply", () => {
    expect(multiply(2, 3)).toBe(6);
  });

  it("divide", () => {
    expect(divide(6, 2)).toBe(3);
    expect(() => divide(6, 0)).toThrow("Cannot divide by zero");
  });

  it("factorial", () => {
    expect(factorial(5)).toBe(120);
    expect(() => factorial(-1)).toThrow(
      "Cannot calculate factorial of a negative number"
    );
  });
});
