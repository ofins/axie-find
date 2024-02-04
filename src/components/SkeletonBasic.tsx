import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function SkeletonBasic(props) {
  return (
    <Box
      sx={{
        bgcolor: "transparent",
        p: 8,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width={props.width ?? 300}
        height={props.height ?? 200}
      />
    </Box>
  );
}
