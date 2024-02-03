const getLandsSales = (size) => `
query getLandsSales {
    settledAuctions {
      lands(from: 0, size: ${size}) {
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

export default getLandsSales;
