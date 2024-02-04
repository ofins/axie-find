import * as React from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import SkeletonBasic from "./SkeletonBasic";

export default function ScatterChartCustom(props) {
  const data = props.data ?? [];

  return data.length ? (
    <ScatterChart
      width={500}
      height={300}
      sx={{ maxWidth: "90vw" }}
      series={[{ data, id: "pvId" }]}
      xAxis={[
        { min: props.data?.[0]?.x, max: props?.data?.[data.length - 1]?.x },
      ]}
    />
  ) : (
    <SkeletonBasic />
  );
}
