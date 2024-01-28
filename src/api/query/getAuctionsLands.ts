const getAuctionsLands = (size: string, landType: string) => `
query GetListedLands {
    lands(
      size: ${size}
      criteria: {landType: ${landType}}
      auctionType: Sale
      sort: PriceAsc
    ) {
      results {
        tokenId
        owner
        row
        col
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
      }
    }
  }
`;

export default getAuctionsLands;
