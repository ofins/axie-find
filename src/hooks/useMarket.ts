import { useState } from "react";
import { MoneyConfig, formatMoney } from "@/util/formatMoney";
import { fetchAxieMarketData } from "@/api/axieMarketPlace";
import { fetchMavisMarketData } from "@/api/mavisMarketPlace";

export const useLand = () => {
  const updateFrequency = 300000;
  const [count, setCount] = useState<number>(0);
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

  const fetchLandSalesData = async (size: number = 500) => {
    const params = {
      queryType: "landSalesQuery",
      variables: {
        size: size,
      },
    };

    const response = await fetchAxieMarketData(params);
    const data = response.data;

    try {
      landTypes.forEach((landType) => {
        const landArr = [];
        data.map((land) => {
          if (land.landType === landType) {
            landArr.push(land);
          }
        });
        setLandLists((prevLandLists) => ({
          ...prevLandLists,
          [landType]: landArr,
        }));
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLandAuctionsData = async (size: number = 500) => {
    const params = {
      queryType: "landsAuctionQuery",
      variables: {
        size: size,
      },
    };

    const response = await fetchAxieMarketData(params);
    const data = response.data;

    landTypes.forEach((landType) => {
      const landArr = [];
      data.map((land) => {
        if (land.landType === landType) {
          landArr.push(land);
        }
      });

      setLandLists((prevLandLists) => ({
        ...prevLandLists,
        [landType]: landArr,
      }));
    });

    setLoading(false);
  };

  const fetchAllLandsData = async (view: string) => {
    switch (view) {
      case "sales":
        fetchLandSalesData();
        break;
      case "auctions":
        fetchLandAuctionsData();
        break;
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

        const formattedPrice = formatMoney(withPrice, MoneyConfig.AxieUnit);

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
          MoneyConfig.AxieUnit
        );
        const bidPrice = formatMoney(
          land.highestOffer?.currentPrice ?? 0,
          MoneyConfig.AxieUnit
        );
        results[landType].ask.push(askPrice);
        results[landType].bid.push(bidPrice);
      });
    });
    return results;
  };

  return {
    count,
    landTypes,
    landIcons,
    loading,
    errorMessage,
    landLists,
    updateFrequency,
    setCount,
    fetchLandSalesData,
    fetchAllLandsData,
    createLandSalesChartData,
    createLandAuctionsChartData,
  };
};

export const useGenkai = () => {
  const updateFrequency = 300000;
  const [genkaiLists, setGenkaiLists] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchGenkaiMarketData = async (dataType: string) => {
    const params = {
      queryType: dataType,
    };

    try {
      const response = await fetchMavisMarketData(params);
      const data = response.data;
      setGenkaiLists(data);
      return data;
    } catch (error) {
      setErrorMessage(error);
      console.error(`Error fetching market data`, error);
    } finally {
      setLoading(false);
    }
  };

  const createGenkaiSalesChartData = () => {
    const data = [];
    genkaiLists.map((genkai) => {
      const genkaiData = {
        x: genkai?.timestamp,
        y: formatMoney(genkai?.realPrice, MoneyConfig.MavisUnit),
        id: genkai?.txHash,
      };
      data.push(genkaiData);
    });

    return data;
  };

  const createGenkaiAuctionsChartData = () => {
    const results = { ask: [], bid: [] };
    genkaiLists.map((genkai) => {
      const askPrice = formatMoney(
        genkai.order.currentPrice,
        MoneyConfig.AxieUnit
      );
      const bidPrice = formatMoney(
        genkai.offers[0]?.currentPrice ?? 0,
        MoneyConfig.AxieUnit
      );
      results.ask.push(askPrice);
      results.bid.push(bidPrice);
    });
    return results;
  };

  return {
    genkaiLists,
    loading,
    errorMessage,
    updateFrequency,
    createGenkaiSalesChartData,
    createGenkaiAuctionsChartData,
    fetchGenkaiMarketData,
  };
};

export const useExchangeRate = () => {
  const updateFrequency = 300000;
  const [exchangeRate, setExchangeRate] = useState();
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
