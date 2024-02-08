import React from "react";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";

export default function Error(props) {
  return (
    <div className="flex gap-6px">
      <RunningWithErrorsIcon />
      <span>{props.error.message ?? "An error has occurred."}</span>
    </div>
  );
}
