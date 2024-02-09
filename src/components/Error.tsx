import React from "react";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";

export default function Error(props) {
  console.log(props.error.message);
  return (
    <div className="flex gap-6px">
      <RunningWithErrorsIcon />
      <span>
        Please be patient while the server is spinning up. You may try
        refreshing the page again in one minute.
      </span>
    </div>
  );
}
