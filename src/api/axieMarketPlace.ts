import Http from "@/util/http";

enum Api {
  AXIE_MP = "/axie-marketplace",
}

export const fetchAxieMarketData = (params) => Http.post(Api.AXIE_MP, params);