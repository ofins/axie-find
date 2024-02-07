import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import sortBy from "lodash/sortBy";

export default function LandAuctionsBidAskChart(props) {
  const data = props.data;

  // if (!data.bid.length && !data.ask.length) {
  // const bidArr = sortBy(data.bid);
  // const askArr = sortBy(data.ask);
  // }
  console.log("here", data);

  return data.bid.length > 0 && data.ask.length > 0 ? (
    <BarChart
      series={[
        { data: data.bid, stack: "A", label: "Bid" },
        { data: data.ask, stack: "A", label: "Ask" },
        // { data: [4, 2, 5, 4, 1], stack: "B", label: "Series B1" },
        // { data: [2, 8, 1, 3, 1], stack: "B", label: "Series B2" },
        // { data: [10, 6, 5, 8, 9], label: "Series C1" },
      ]}
      width={600}
      height={350}
    />
  ) : (
    <div className="w-500px h-300px bg-transparent" />
  );
}
