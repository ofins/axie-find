import request, { gql } from "graphql-request";
import { AXIE_FIND_SERVER } from "@/settings/index";

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

const getAuctionsLands = async () => {
  try {
    return await request(endpoint, landsAuctionQuery, {
      size: 500,
    });
  } catch (error) {
    console.error(`Error in getAuctionsLands request`, error);
  }
};

export default getAuctionsLands;
