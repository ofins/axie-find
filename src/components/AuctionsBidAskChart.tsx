import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  blueberryTwilightPalette,
  mangoFusionPalette,
  cheerfulFiestaPalette,
} from "@mui/x-charts/colorPalettes";

export default function AuctionsBidAskChart(props) {
  const data = props.data;
  const isDataLoad = data.ask.length > 0 && data.bid.length > 0;

  const maxBars = 20;

  return isDataLoad ? (
    <BarChart
      series={[
        {
          data: data.bid.slice(0, maxBars),
          label: "Bid",
        },
        {
          data: data.ask.slice(0, maxBars),
          label: "Ask",
        },
      ]}
      width={props.width ?? 600}
      height={props.height ?? 350}
    />
  ) : (
    <div className="w-500px h-300px bg-transparent" />
  );
}
