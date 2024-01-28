const getListedLands = (size) => `
query RecentlySoldLands {
    settledAuctions {
    lands(from: 0, size: ${size}) {
        results {
        landType
        col
        row
        tokenId
        owner
        transferHistory(size: 1) {
            results {
            withPriceUsd
            timestamp
            withPrice
            }
        }
        }
        total
    }
    }
}
`;

export default getListedLands