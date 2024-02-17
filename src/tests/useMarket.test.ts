import {
  describe,
  expect,
  it,
  jest,
  afterEach,
  beforeEach,
} from "@jest/globals";
import { useExchangeRate, useItem } from "../hooks/useMarket";
import { fetchAxieMarketData } from "@/api/axieMarketPlace";
import { renderHook, waitFor } from "@testing-library/react";

jest.mock("@/api/axieMarketPlace", () => ({
  fetchAxieMarketData: jest.fn(),
}));

describe("useExchangeRate", () => {
  describe("getExchangeRates", () => {
    let result;

    beforeEach(() => {
      result = renderHook(() => useExchangeRate()).result;

      expect(result.current.exchangeRate).toBeNull();
      expect(result.current.loading).toBeTruthy();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should fetch exchange rates and update state correctly", async () => {
      const mockData = ["item1", "item2"];
      (fetchAxieMarketData as jest.Mock).mockResolvedValueOnce({
        data: mockData,
      });

      await waitFor(() => result.current.getExchangeRates());

      expect(result.current.exchangeRate).toEqual(mockData);
      expect(result.current.loading).toBeFalsy();
    });

    it.skip("should handle errors correctly", async () => {
      const mockError = new Error("fetched error");
      (fetchAxieMarketData as jest.Mock).mockRejectedValueOnce(mockError);

      try {
        await waitFor(() => result.current.fetchItemSalesData());
      } catch (error) {
        expect(error).toBe(mockError);
      }

      expect(fetchAxieMarketData).toHaveBeenCalledWith({
        queryType: "exchangeRatesQuery",
      });

      expect(result.current.loading).toBeFalsy();
    });
  });
});

describe("useItem", () => {
  describe("fetchItemSalesData", () => {
    let result;

    beforeEach(() => {
      // const { result } = renderHook(() => useItem());
      result = renderHook(() => useItem()).result;

      expect(result.current.loading).toBeTruthy();
      expect(result.current.errorMessage).toBeNull();
      expect(result.current.itemLists).toEqual([]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should fetch item sales data and update state correctly", async () => {
      const mockData = ["item1", "item2"];
      (fetchAxieMarketData as jest.Mock).mockResolvedValueOnce({
        data: mockData,
      });

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

    it("should handle errors correctly", async () => {
      const mockError = new Error("fetch failed");
      (fetchAxieMarketData as jest.Mock).mockRejectedValueOnce(mockError);

      try {
        await waitFor(() => result.current.fetchItemSalesData());
      } catch (error) {
        expect(error).toBe(mockError);
      }

      expect(fetchAxieMarketData).toHaveBeenCalledWith({
        queryType: "erc1155TokenSalesQuery",
        variables: {
          size: 500,
          tokenType: "Consumable",
        },
      });

      expect(result.current.loading).toBeFalsy();
      expect(result.current.errorMessage).toEqual(mockError);
      expect(result.current.itemLists).toEqual([]);
    });

    it("should handle empty response correctly", async () => {
      (fetchAxieMarketData as jest.Mock).mockResolvedValueOnce({ data: [] });

      await waitFor(() => result.current.fetchItemSalesData());

      expect(result.current.itemLists).toEqual([]);
    });
  });
});
