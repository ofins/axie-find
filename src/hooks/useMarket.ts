import { useState } from "react";

export const useMarket = () => {
  const [count, setCount] = useState<number>(0);

  

  return {
    count,
    setCount
  }

};
