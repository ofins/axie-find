import * as React from "react";
import Switch from "@mui/material/Switch";
import { CookieKey, setThemeCookie } from "@/util/cookies";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/themeSlice";

export default function SwitchButton() {
  const [checked, setChecked] = React.useState(true);

  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    dispatch(toggleTheme());
  }, [checked]);

  return (
    <Switch
      color={"info"}
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
