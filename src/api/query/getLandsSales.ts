import request, { gql } from "graphql-request";
import { AXIE_FIND_SERVER } from "@/settings/index";

export const endpoint = `${AXIE_FIND_SERVER}/axie-marketplace`;

const landSalesQuery = gql`
  query getLandsSales($size: Int) {
    settledAuctions {
      lands(from: 0, size: $size) {
        results {
          landType
          col
          row
          tokenId
          owner
          ownerProfile {
            name
          }
          transferHistory(size: 10) {
            results {
              timestamp
              withPrice
              fromProfile {
                name
                addresses {
                  ronin
                }
              }
              txHash
            }
            total
          }
        }
        total
      }
    }
  }
`;

const getLandsSales = async () => {
  try {
    return await request(endpoint, landSalesQuery, {
      size: 500,
    });
  } catch (error) {
    console.error(`Error in getAuctionsLands request`, error);
  }
};

export default getLandsSales;
