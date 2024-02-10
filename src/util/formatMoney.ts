const MarketUnit = 1000000000000000000;

export enum MoneyConfig {
  Default = "default",
  MarketUnit = "MarketUnit",
  SmallNum = "SmallNum",
}

export const formatMoney = (
  num: string | number,
  config = MoneyConfig.Default
) => {
  if (isNaN(num)) {
    return "N/A";
  }

  if (config === MoneyConfig.Default) {
    return parseFloat(num?.toFixed(3));
  } else if (config === MoneyConfig.MarketUnit) {
    return parseFloat((num / MarketUnit).toFixed(3));
  } else if (config === MoneyConfig.MarketUnit) {
    return parseFloat((num / MarketUnit).toFixed(0));
  } else if (config === MoneyConfig.SmallNum) {
    return parseFloat(num / MarketUnit);
  }
};
