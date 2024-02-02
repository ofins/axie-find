const getGenkaiSales = `
query getGenkaiSales {
    recentlySolds(
      from: 10
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

export default getGenkaiSales;
