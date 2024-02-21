import {
  describe,
  expect,
  it,
  test,
  jest,
  afterEach,
  beforeEach,
} from "@jest/globals";
import { useExchangeRate, useItem, useGenkai } from "@/hooks/useMarket";
import { fetchAxieMarketData } from "@/api/axieMarketPlace";
import { fetchMavisMarketData } from "@/api/mavisMarketPlace";
import { renderHook, waitFor } from "@testing-library/react";

jest.mock("@/api/axieMarketPlace", () => ({
  fetchAxieMarketData: jest.fn(),
}));

jest.mock("@/api/mavisMarketPlace", () => ({
  fetchMavisMarketData: jest.fn(),
}));

jest.mock("@/util/formatMoney", () => ({
  MoneyConfig: { MarketUnit: "USD" },
  formatMoney: jest.fn((x) => x),
}));

describe("useGenkai", () => {
  describe("fetchGenkaiMarketData", () => {
    let result;

    beforeEach(() => {
      result = renderHook(() => useGenkai()).result;

      expect(result.current.genkaiLists).toEqual([]);
      expect(result.current.loading).toBeTruthy();
      expect(result.current.errorMessage).toBeNull();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should fetch data and update states correctly", async () => {
      const mockData = ["item1", "item2"];
      // const mockDataType = "dataTypeA"
      (fetchMavisMarketData as jest.Mock).mockResolvedValueOnce({
        data: mockData,
      });

      await waitFor(() => result.current.fetchGenkaiMarketData());

      expect(result.current.genkaiLists).toEqual(mockData);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.errorMessage).toBeNull();
    });

    it("should handle errors correctly and states to update correctly", async () => {
      const mockError = new Error("fetch failed");
      (fetchMavisMarketData as jest.Mock).mockRejectedValueOnce(mockError);

      try {
        await waitFor(() => result.current.fetchGenkaiMarketData());
      } catch (error) {
        expect(error).toBe(mockError);
      }
      expect(result.current.errorMessage).toBe(mockError);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.genkaiLists).toEqual([]);
    });

    it("should handle empty responses correctly", async () => {
      (fetchMavisMarketData as jest.Mock).mockResolvedValueOnce({ data: [] });
      await waitFor(() => result.current.fetchGenkaiMarketData());
      expect(result.current.genkaiLists).toEqual([]);
    });
  });

  describe("createGenkaiSalesChartData", () => {
    test.concurrent.each([
      [
        [
          { timestamp: "2024-02-16", realPrice: 100, txHash: "hash1" },
          { timestamp: "2024-02-17", realPrice: 150, txHash: "hash2" },
        ],
        [
          { x: "2024-02-16", y: 100, id: "hash1" },
          { x: "2024-02-17", y: 150, id: "hash2" },
        ],
      ],
      [
        [
          { timestamp: null, realPrice: null, txHash: null },
          { timestamp: null, realPrice: 150, txHash: "hash2" },
        ],
        [
          { x: null, y: null, id: null },
          { x: null, y: 150, id: "hash2" },
        ],
      ],
      [null, []],
      [undefined, []],
    ])(
      "should verify behavior of function for different input scenarios",
      (a, expected) => {
        const { result } = renderHook(() => useGenkai());
        result.current.genkaiLists = a;
        const chartData = result.current.createGenkaiSalesChartData;
        expect(chartData(a)).toEqual(expected);
      },
    );
  });

  describe("createGenkaiAuctionsChartData", () => {
    test.concurrent.each([
      [
        [
          {
            order: { currentPrice: 100 },
            offers: [{ currentPrice: 90 }],
          },
          {
            order: { currentPrice: 150 },
            offers: [{ currentPrice: 140 }],
          },
        ],
        {
          ask: [100, 150],
          bid: [90, 140],
        },
      ],
      [
        [
          {
            order: { currentPrice: null },
            offers: [{ currentPrice: null }],
          },
          {
            order: { currentPrice: 150 },
            offers: [{ currentPrice: 140 }],
          },
        ],
        {
          ask: [0, 150],
          bid: [0, 140],
        },
      ],
      [null, { ask: [], bid: [] }],
      [undefined, { ask: [], bid: [] }],
    ])(
      "should verify behavior of function for different input scenarios",
      (a, expected) => {
        const { result } = renderHook(() => useGenkai());
        result.current.genkaiLists = a;
        const chartData = result.current.createGenkaiAuctionsChartData;
        expect(chartData(a)).toEqual(expected);
      },
    );
  });
});

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

    it("should handle errors correctly", async () => {
      const mockError = new Error("fetched error");
      (fetchAxieMarketData as jest.Mock).mockRejectedValueOnce(mockError);

      try {
        await waitFor(() => result.current.getExchangeRates());
      } catch (error) {
        expect(error).toEqual(mockError);
      }

      expect(fetchAxieMarketData).toHaveBeenCalledWith({
        queryType: "exchangeRatesQuery",
      });

      expect(result.current.loading).toBeFalsy();
    });

    it("should handle empty responses correctly", async () => {
      (fetchAxieMarketData as jest.Mock).mockResolvedValueOnce({ data: [] });
      await waitFor(() => result.current.getExchangeRates());
      expect(result.current.exchangeRate).toEqual([]);
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
