import * as React from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";

export default function ScatterChartCustom(props) {
  type Data = {
    x?: number;
    y?: number;
    id?: string | number;
  };

  const data: Data = props.data ?? [];

  return data.length ? (
    <ScatterChart
      width={props.width ?? 500}
      height={props.height ?? 300}
      sx={{ maxWidth: "90vw" }}
      series={[{ data, id: "pvId" }]}
      xAxis={[
        { max: props.data?.[0]?.x, min: props?.data?.[data.length - 1]?.x },
      ]}
    />
  ) : (
    <div className="w-500px h-300px bg-transparent" />
  );
}
