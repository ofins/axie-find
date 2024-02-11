import { describe, test, expect, it, jest } from "@jest/globals";
import { sum } from "../hooks/useMarket";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
