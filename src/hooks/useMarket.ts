import { useState, useEffect } from "react";
import { getAxieMarketPlace } from "@/api/axieMarketPlace";
import getLandsSales from "@/api/query/getLandsSales";
import getAuctionsLands from "@/api/query/getAuctionsLands";

export const useLand = () => {
  const updateFrequency = 300000;
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
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

  return {
    count,
    landTypes,
    landIcons,
    loading,
    landLists,
    updateFrequency,
    setCount,
    fetchLandSalesData,
    fetchAllLandsData,
  };
};
