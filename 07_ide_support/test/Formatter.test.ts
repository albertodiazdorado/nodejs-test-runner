import { describe, it } from "node:test";
import * as assert from "node:assert/strict";
import { Formatter } from "../src/Formatter";

describe("Formatter", () => {
    const formatter = new Formatter();
    it("uppercases correctly", async () => {
        // given
        const input = "I am hungry!";

        // when
        const result = await formatter.toUpperCase(input);

        // then
        assert.equal(result, "I AM HUNGRY!")
    })
    it("another uppercase", async () => {
        // given
        const input = "Let me in!";

        // when
        const result = await formatter.toUpperCase(input);

        // then
        assert.equal(result, "LET ME IN!")
    })
})