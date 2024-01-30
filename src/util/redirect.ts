import { AXIE_MARKETPLACE, AXIE_PROFILE } from "../settings";

export const redirectMarketLand = (row: number, col: number) => {
  window.open(`${AXIE_MARKETPLACE}/lands/${row}/${col}`, "_blank");
};

export const redirectProfile = (owner: string) => {
  window.open(`${AXIE_PROFILE}/${owner}/lands`, "_blank");
};
