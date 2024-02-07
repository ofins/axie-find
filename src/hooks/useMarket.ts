import { useState, useEffect } from "react";
import { MoneyConfig, formatMoney } from "@/util/formatMoney";
import { fetchAxieMarketData } from "@/api/axieMarketPlace";
import { fetchMavisMarketData } from "@/api/mavisMarketPlace";

export const useLand = () => {
  const updateFrequency = 300000;
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState({});
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
    setLoading(true);

    const params = {
      queryType: "landSalesQuery",
      variables: {
        size: size,
      },
    };

    const response = await fetchAxieMarketData(params);
    const data = response;

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

  const fetchLandAuctionsData = async (size: number = 500) => {
    setLoading(true);

    const params = {
      queryType: "landsAuctionQuery",
      variables: {
        size: size,
      },
    };

    const response = await fetchAxieMarketData(params);
    const data = response;

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

  const setScatterData = () => {
    const result = {};
    landTypes.map((landType) => {
      const data = [];
      landLists[landType].map((land) => {
        const landData = {
          x: land.transferHistory?.results[0]?.timestamp,
          y: formatMoney(
            land.transferHistory?.results[0]?.withPrice,
            MoneyConfig.AxieUnit
          ),
          id: land.transferHistory?.results[0]?.txHash,
        };
        data.push(landData);
      });
      result[landType] = data;
    });
    return result;
  };

  useEffect(() => {
    setChartData(setScatterData());
  }, [landLists]);

  return {
    count,
    chartData,
    landTypes,
    landIcons,
    loading,
    landLists,
    updateFrequency,
    setCount,
    fetchLandSalesData,
    fetchAllLandsData,
    setScatterData,
  };
};

export const useGenkai = () => {
  const updateFrequency = 300000;
  const [genkaiLists, setGenkaiLists] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState({});

  const fetchGenkaiMarketData = async (dataType: string) => {
    const params = {
      queryType: dataType,
    };

    setLoading(true);
    try {
      const response = await fetchMavisMarketData(params);
      const data = response;
      setGenkaiLists(data);
      return data;
    } catch (error) {
      console.error(`Error fetching market data`, error);
    } finally {
      setLoading(false);
    }
  };

  const setScatterData = () => {
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

  useEffect(() => {
    setChartData(setScatterData());
  }, [genkaiLists]);

  return {
    genkaiLists,
    chartData,
    loading,
    updateFrequency,
    fetchGenkaiMarketData,
  };
};

export const useExchangeRate = () => {
  const updateFrequency = 300000;
  const [exchangeRate, setExchangeRate] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const getExchangeRates = async () => {
    setLoading(true);
    try {
      const params = {
        queryType: "exchangeRatesQuery",
      };

      const response = await fetchAxieMarketData(params);
      setExchangeRate(response);
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
