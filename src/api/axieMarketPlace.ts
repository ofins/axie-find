import Http from "@/util/http";

enum Api {
  AXIE_MARKETPLACE = "/axie-marketplace",
}

export const getAxieMarketPlace = (query: string) =>
  Http.post(Api.AXIE_MARKETPLACE, { query: query });
