import { beforeEach, describe, it, mock } from "node:test";
import * as assert from "node:assert/strict";
import { getSecretNumber } from "../../src/modules/secret-numbers";
import { add } from "../../src/modules/addition-module";

describe("addition-module", () => {
    const mockedGetSecretNumber = mock.fn(getSecretNumber);
    beforeEach(() => {
        mock.reset();
        mockedGetSecretNumber.mock.resetCalls();
        mockedGetSecretNumber.mock.mockImplementation(() => 0);
    })
    it("does NOT mock the Jest-way", async () => {
        // when
        const result = await add(2, 2);

        // then
        assert.equal(result, 46)
    })
    it("rather, it only mocks in the local scope", async () => {
        // when
        const result = mockedGetSecretNumber();

        // then
        assert.equal(result, 0)
    })
})
