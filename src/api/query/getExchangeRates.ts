const getExchangeRates = `
query ExchangeRate {
    exchangeRate {
      axs {
        usd
      }
      eth {
        usd
      }
      ron {
        usd
      }
      slp {
        usd
      }
      usd {
        usd
      }
      usdc {
        usd
      }
    }
  }
`

export default getExchangeRates