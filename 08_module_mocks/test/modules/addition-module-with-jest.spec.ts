import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { getSecretNumber } from "../../src/modules/secret-numbers";
import { add } from "../../src/modules/addition-module";

jest.mock("../../src/modules/secret-numbers");

describe("addition-module", () => {
    const mockedGetSecretNumber = jest.mocked(getSecretNumber);
    beforeEach(() => {
        jest.resetAllMocks();
        mockedGetSecretNumber.mockReturnValue(0);
    })
    it("mocks the secret-numbers module globally for all imported modules", async () => {
        // when
        const result = await add(2, 2);

        // then
        expect(result).toBe(4)
    })
})
