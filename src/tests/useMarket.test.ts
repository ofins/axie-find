import {
  describe,
  test,
  expect,
  it,
  jest,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { useItem } from "../hooks/useMarket";
import { fetchAxieMarketData } from "../api/axieMarketPlace";
import { renderHook, waitFor } from "@testing-library/react";

jest.mock("../api/axieMarketPlace", () => ({
  fetchAxieMarketData: jest.fn(),
}));

describe("useItem", () => {
  describe("fetchItemSalesData", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should fetch item sales data and update state correctly", async () => {
      const mockData = ["item1", "item2"];
      (fetchAxieMarketData as jest.Mock).mockResolvedValueOnce({
        data: mockData,
      });

      const { result } = renderHook(() => useItem());

      expect(result.current.loading).toBeTruthy();
      expect(result.current.errorMessage).toBeNull();
      expect(result.current.itemLists).toEqual([]);

      await waitFor(() => result.current.fetchItemSalesData());

      expect(fetchAxieMarketData).toHaveBeenCalledWith({
        queryType: "erc1155TokenSalesQuery",
        variables: {
          size: 500,
          tokenType: "Consumable",
        },
      });

      expect(result.current.loading).toBeFalsy();
      expect(result.current.errorMessage).toBeNull();
      expect(result.current.itemLists).toEqual(mockData);
    });
  });
});
