import { gql } from "graphql-request";
import { AXIE_FIND_SERVER } from "@/settings/index";
import { gqlRequest } from ".";

export const endpoint = `${AXIE_FIND_SERVER}/mavis-marketplace`;

const genkaiSalesQuery = gql`
  query getGenkaiSales {
    recentlySolds(
      from: 0
      size: 40
      tokenAddress: "0x1f7c16fce4fc894143afb5545bf04f676bf7dcf3"
    ) {
      results {
        realPrice
        timestamp
        paymentToken
        txHash
        assets {
          address
          erc
          id
          orderId
          quantity
        }
        matcher
        orderId
        orderKind
        maker
      }
    }
  }
`;

const getGenkaiSales = () => gqlRequest(endpoint, genkaiSalesQuery);

export default getGenkaiSales;
