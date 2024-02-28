import { useState } from "react";
import { MoneyConfig, formatMoney } from "@/util/formatMoney";
import { fetchAxieMarketData } from "@/api/axieMarketPlace";
import { fetchMavisMarketData } from "@/api/mavisMarketPlace";

export const useLand = () => {
  const updateFrequency = 300000;
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [landLists, setLandLists] = useState({
    Savannah: [],
    Forest: [],
    Arctic: [],
    Mystic: [],
    Genesis: [],
  });

  const landTypes = ["Savannah", "Forest", "Arctic", "Mystic", "Genesis"];
  const landIcons = ["🏝️", "🌲", "🏔️", "🌺", "🏵️"];

  const fetchLandInfo = async (queryType: string, size: number = 500) => {
    const params = {
      queryType: queryType,
      variables: {
        size: size,
      },
    };

    try {
      const response = await fetchAxieMarketData(params);
      return response.data;
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const groupLands = (data) => {
    const result = {};
    landTypes.forEach((landType) => {
      result[landType] = data.filter((item) => item.landType === landType);
    });
    return result;
  };

  const fetchAllLandsData = async (view: string) => {
    switch (view) {
      case "sales": {
        const response = await fetchLandInfo("landSalesQuery");
        const data = groupLands(response);
        setLandLists(data);
        break;
      }
      case "auctions": {
        const response = await fetchLandInfo("landsAuctionQuery");
        const data = groupLands(response);
        setLandLists(data);
        break;
      }
      default:
        break;
    }
  };

  const createLandSalesChartData = () => {
    const results = {};

    landTypes.forEach((landType) => {
      const typeData = landLists[landType].map((land) => {
        const { timestamp, withPrice, txHash } =
          land.transferHistory?.results[0] ?? {};

        const formattedPrice = formatMoney(withPrice, MoneyConfig.MarketUnit);

        return {
          x: timestamp,
          y: formattedPrice,
          id: txHash,
        };
      });

      results[landType] = typeData;
    });

    return results;
  };

  const createLandAuctionsChartData = () => {
    const results = {};
    landTypes.forEach((landType) => {
      results[landType] = { ask: [], bid: [] };

      landLists[landType].map((land) => {
        const askPrice = formatMoney(
          land?.order?.currentPrice ?? 0,
          MoneyConfig.MarketUnit,
        );
        const bidPrice = formatMoney(
          land.highestOffer?.currentPrice ?? 0,
          MoneyConfig.MarketUnit,
        );
        results[landType].ask.push(askPrice);
        results[landType].bid.push(bidPrice);
      });
    });
    return results;
  };

  return {
    landTypes,
    landIcons,
    loading,
    errorMessage,
    landLists,
    setLandLists,
    updateFrequency,
    fetchLandInfo,
    fetchAllLandsData,
    createLandSalesChartData,
    createLandAuctionsChartData,
  };
};

export const useMavisMarket = () => {
  const updateFrequency = 300000;
  const [itemLists, setItemLists] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchMavisItemMarketData = async (dataType: string) => {
    const params = {
      queryType: dataType,
    };

    try {
      const response = await fetchMavisMarketData(params);
      const data = response.data;
      setItemLists(data);
      return data;
    } catch (error) {
      setErrorMessage(error);
      console.error(`Error fetching market data`, error);
    } finally {
      setLoading(false);
    }
  };

  const createMavisItemsSalesChartData = (array) => {
    const data = [];

    if (!array) {
      return data;
    }

    array.map((item) => {
      const itemData = {
        x: item?.timestamp,
        y: formatMoney(item?.realPrice, MoneyConfig.MarketUnit),
        id: item?.txHash,
      };
      data.push(itemData);
    });

    return data;
  };

  const createMavisItemsAuctionsChartData = (array) => {
    const results = { ask: [], bid: [] };
    if (!array) {
      return results;
    }
    array.map((item) => {
      const askPrice = formatMoney(
        item.order.currentPrice ?? 0,
        MoneyConfig.MarketUnit,
      );
      const bidPrice = formatMoney(
        item.offers[0]?.currentPrice ?? 0,
        MoneyConfig.MarketUnit,
      );
      results.ask.push(askPrice);
      results.bid.push(bidPrice);
    });
    return results;
  };

  return {
    itemLists,
    loading,
    errorMessage,
    updateFrequency,
    createMavisItemsSalesChartData,
    createMavisItemsAuctionsChartData,
    fetchMavisItemMarketData,
  };
};

export const useExchangeRate = () => {
  const updateFrequency = 300000;
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getExchangeRates = async () => {
    try {
      const params = {
        queryType: "exchangeRatesQuery",
      };

      const response = await fetchAxieMarketData(params);
      const data = response.data;
      setExchangeRate(data);
    } catch (error) {
      console.error(`Error fetching market data`, error);
    } finally {
      setLoading(false);
    }
  };

  return {
    exchangeRate,
    loading,
    updateFrequency,
    getExchangeRates,
  };
};

export const useItem = () => {
  const updateFrequency = 300000;
  const [itemLists, setItemLists] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchItemSalesData = async (
    size: number = 500,
    tokenType: string = "Consumable",
  ) => {
    const params = {
      queryType: "erc1155TokenSalesQuery",
      variables: {
        size: size,
        tokenType: tokenType,
      },
    };

    try {
      const response = await fetchAxieMarketData(params);
      const data = response.data;
      setItemLists(data);
      return data;
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    itemLists,
    updateFrequency,
    loading,
    errorMessage,
    fetchItemSalesData,
  };
};
