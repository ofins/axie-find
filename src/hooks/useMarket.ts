import { useState, useEffect } from "react";
import { getAxieMarketPlace } from "@/api/axieMarketPlace";
import { getMavisMarketPlace } from "@/api/mavisMarketPlace";
import getLandsSales from "@/api/query/getLandsSales";
import getAuctionsLands from "@/api/query/getAuctionsLands";
import getGenkaiSales from "@/api/query/getGenkaiSales";
import { MoneyConfig, formatMoney } from "@/util/formatMoney";

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

  const fetchLandSalesData = async () => {
    setLoading(true);
    try {
      const response = await getAxieMarketPlace(getLandsSales(300));
      if (response.status !== 200) {
        throw new Error(
          `Error in fetchLandSalesData! Status: ${response.status}`
        );
      }
      const data = response.data.data.settledAuctions.lands.results;

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
      console.error(`Error fetching market data`, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLandAuctionsData = async (landType) => {
    setLoading(true);
    try {
      const response = await getAxieMarketPlace(
        getAuctionsLands(300, landType)
      );
      if (response.status !== 200) {
        throw new Error(
          `Error in fetchLandSalesData! Status: ${response.status}`
        );
      }

      const data = response.data.data.lands?.results;

      setLandLists((prevLandLists) => ({
        ...prevLandLists,
        [landType]: data,
      }));
    } catch (error) {
      console.error(`Error fetching market data`, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllLandsData = (view: string) => {
    switch (view) {
      case "sales":
        fetchLandSalesData();
        break;
      case "auctions":
        landTypes.forEach((land) => {
          fetchLandAuctionsData(land);
        });
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
  const [genkaiLists, setGenkaiLists] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState({});

  const fetchGenkaiSales = async () => {
    setLoading(true);
    try {
      const response = await getMavisMarketPlace(getGenkaiSales);
      const data = response.data.data.recentlySolds.results;

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
    fetchGenkaiSales,
  };
};
