import Http from "@/util/http";

enum Api {
  MAVIS_MARKETPLACE = "/mavis-marketplace",
}

export const fetchMavisMarketData = (params) =>
  Http.post(Api.MAVIS_MARKETPLACE, params);
