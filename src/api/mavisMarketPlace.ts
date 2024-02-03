import Http from "@/util/http";

enum Api {
  MAVIS_MARKETPLACE = "/mavis-marketplace",
}

export const getMavisMarketPlace = (query: string) =>
  Http.post(Api.MAVIS_MARKETPLACE, { query: query });
