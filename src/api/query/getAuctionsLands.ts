const getAuctionsLands = (size: string, landType: string) => `
query GetAuctionsLands {
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
      transferHistory(size: 3) {
        results {
          withPrice
          timestamp
        }
      }
      ownerProfile {
        name
        accountId
        activated
      }
    }
  }
}
`;

export default getAuctionsLands;
