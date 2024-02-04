import { useState } from "react";
import { getAxieMarketPlace } from "@/api/axieMarketPlace";
import getLandsSales from "@/api/query/getLandsSales";

export const useLand = () => {
  const updateFrequency = 300000
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [landLists, setLandLists] = useState<[]>([]);
  
  const landTypes = ["Savannah", "Forest", "Arctic", "Mystic", "Genesis"];
  const landIcons = ["🏝️", "🌲", "🏔️", "🌺", "🏵️"];

  const fetchLandSalesData = async () => {
    setLoading(true);
    try {
      const data = await getAxieMarketPlace(getLandsSales(300));
      setLandLists(data.data.data.settledAuctions.lands.results);
    } catch (error) {
      console.error(`Error fetching market data`, error);
    } finally {
      setLoading(false);
    }
  }

  return {
    count,
    landTypes,
    landIcons,
    loading,
    landLists,
    updateFrequency,
    setCount,
    fetchLandSalesData
  };
};
