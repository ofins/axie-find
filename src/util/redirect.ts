import {
  AXIE_MARKETPLACE,
  AXIE_PROFILE,
  RONIN_URL,
  MAVIS_MARKETPLACE,
} from "../settings";

export const redirectMarketLand = (row: number, col: number) => {
  window.open(`${AXIE_MARKETPLACE}/lands/${row}/${col}`, "_blank");
};

export const redirectProfile = (owner: string) => {
  window.open(`${AXIE_PROFILE}/${owner}/lands`, "_blank");
};

export const redirectRoninTx = (tx: string) => {
  window.open(`${RONIN_URL}/tx/${tx}`, "_blank");
};

export const redirectGenkai = (address: string, id: number) => {
  window.open(`${MAVIS_MARKETPLACE}/collections/${address}/${id}`, "_blank");
};
