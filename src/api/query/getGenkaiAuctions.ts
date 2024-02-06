import { gql } from "graphql-request";
import { AXIE_FIND_SERVER } from "@/settings/index";
import { gqlRequest } from ".";

export const endpoint = `${AXIE_FIND_SERVER}/mavis-marketplace`;

const genkaiAuctionsQuery = gql`
  query MyQuery {
    erc721Tokens(
      from: 0
      size: 50
      tokenAddress: "0x1f7c16fce4fc894143afb5545bf04f676bf7dcf3"
      auctionType: Sale
      sort: PriceAsc
    ) {
      results {
        name
        transferHistory(size: 3) {
          results {
            withPrice
            timestamp
            to
          }
          total
        }
        image
        owner
        order {
          startedAt
          currentPrice
          assets {
            address
            id
          }
        }
        offers {
          currentPrice
        }
      }
    }
  }
`;

const getGenkaiAuctions = () => gqlRequest(endpoint, genkaiAuctionsQuery);

export default getGenkaiAuctions;
