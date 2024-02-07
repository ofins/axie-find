import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function LandAuctionsBidAskChart(props) {
  const data = props.data;

  const maxLength = Math.floor(data.ask.length * 0.8);

  return data.bid.length > 0 && data.ask.length > 0 ? (
    <BarChart
      series={[
        // { data: data.bid, label: "Bid" },
        { data: data.ask.slice(0, maxLength), label: "Ask" },
      ]}
      width={600}
      height={350}
    />
  ) : (
    <div className="w-500px h-300px bg-transparent" />
  );
}
