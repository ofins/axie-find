import { useState } from "react";

export const useMarket = () => {
  const [count, setCount] = useState<number>(0);

  const landTypes = ["Savannah", "Forest", "Arctic", "Mystic", "Genesis"];

  const landIcons = ["🏝️", "🌲", "🏔️", "🌺", "🏵️"];

  return {
    count,
    landTypes,
    landIcons,
    setCount,
  };
};
