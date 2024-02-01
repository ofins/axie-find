const getSalesLands = (size) => `
query GetSalesLands {
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
        transferHistory(size: 1) {
            results {
                withPriceUsd
                timestamp
                withPrice
                fromProfile{
                    name
                    addresses {
                        ronin
                    }
                }
            }
          }
        }
        total
    }
    }
}
`;

export default getSalesLands;
