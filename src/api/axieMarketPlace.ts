import Http from "@/util/http";

enum Api {
  SALES_URL = "/axie-marketplace/sales",
  AUCTIONS_URL = "/axie-marketplace/auctions",
  EXCHANGE_RATES_URL = "/axie-marketplace/exchangeRates",
}

export const fetchLandSales = (variables) =>
  Http.post(Api.SALES_URL, { variables: variables });

export const fetchLandAuctions = (variables) =>
  Http.post(Api.AUCTIONS_URL, { variables: variables });

export const fetchExchangeRate = () => Http.get(Api.EXCHANGE_RATES_URL);
