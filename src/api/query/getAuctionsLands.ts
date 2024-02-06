import { gql } from "graphql-request";
import { AXIE_FIND_SERVER } from "@/settings/index";
import { gqlRequest } from ".";

export const endpoint = `${AXIE_FIND_SERVER}/axie-marketplace`;

export const landsAuctionQuery = gql`
  query GetAuctionsLands($size: Int) {
    lands(auctionType: Sale, sort: PriceAsc, size: $size) {
      results {
        tokenId
        owner
        row
        col
        landType
        order {
          id
          startedAt
          currentPrice
        }
        highestOffer {
          currentPrice
          expiredAt
          addedAt
        }
        transferHistory(size: 3) {
          results {
            withPrice
            timestamp
            toProfile {
              addresses {
                ethereum
                ronin
              }
            }
            fromProfile {
              addresses {
                ethereum
                ronin
              }
            }
          }
        }
        ownerProfile {
          name
          accountId
          activated
        }
      }
      total
    }
  }
`;

const getAuctionsLands = () =>
  gqlRequest(endpoint, landsAuctionQuery, { size: 500 });

export default getAuctionsLands;
