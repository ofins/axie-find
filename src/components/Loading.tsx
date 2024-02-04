import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading(props) {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress color={props.color} size={props.size} />
    </Box>
  );
}
