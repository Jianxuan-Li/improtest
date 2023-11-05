import { generateRandomString } from "./spotifyAuthUtils";

describe("generateRandomString", () => {
  it("should generate a string of the specified length", () => {
    const mGetRandomValues = jest.fn().mockReturnValueOnce(new Uint32Array(10));
    Object.defineProperty(window, "crypto", {
      value: { getRandomValues: mGetRandomValues },
    });
    const length = 10;
    const result = generateRandomString(length);
    expect(result).toHaveLength(length);
  });
});
