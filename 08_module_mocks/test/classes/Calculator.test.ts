import { beforeEach, describe, it, mock } from "node:test";
import * as assert from "node:assert/strict";
import { getSecretNumber } from "../../src/modules/secret-numbers";
import { Calculator } from "../../src/classes/Calculator";

describe("Calculator", () => {
    const mockedGetSecretNumber = mock.fn(getSecretNumber);
    // The calculator can use the local mock
    const calculator = new Calculator(mockedGetSecretNumber);
    
    beforeEach(() => {
        mock.reset();
        mockedGetSecretNumber.mock.resetCalls();
        mockedGetSecretNumber.mock.mockImplementation(() => 0);
    })
    
    it("can use the local mock", async () => {
        // when
        const result = await calculator.add(2, 2);

        // then
        assert.equal(result, 4)
        assert.equal(mockedGetSecretNumber.mock.callCount(), 1);
        assert.deepEqual(mockedGetSecretNumber.mock.calls[0].arguments, []);
    })
    it("can also test against errors", async () => {
        // given
        mockedGetSecretNumber.mock.mockImplementation(() => {
            throw new Error("Something went wrong")
        });

        // when -> then
        assert.rejects(() => calculator.add(2, 2));
        assert.equal(mockedGetSecretNumber.mock.callCount(), 1);
        assert.deepEqual(mockedGetSecretNumber.mock.calls[0].arguments, []);
    })
})
