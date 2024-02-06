import request, { gql } from "graphql-request";
import { AXIE_FIND_SERVER } from "@/settings/index";
import { gqlRequest } from ".";

export const endpoint = `${AXIE_FIND_SERVER}/axie-marketplace`;

const exchangeRatesQuery = gql`
  query ExchangeRate {
    exchangeRate {
      axs {
        usd
      }
      eth {
        usd
      }
      ron {
        usd
      }
      slp {
        usd
      }
      usd {
        usd
      }
      usdc {
        usd
      }
    }
  }
`;

const getExchangeRates = () => gqlRequest(endpoint, exchangeRatesQuery);

export default getExchangeRates;
