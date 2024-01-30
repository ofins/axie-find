const AxieBaseUnit = 1000000000000000000;

export enum MoneyConfig {
  Default = "default",
  AxieUnit = "AxieUnit",
}

export const formatMoney = (
  num: string | number,
  config = MoneyConfig.Default
) => {
  if (typeof num === "string") {
    num = parseFloat(num);
  }

  if (isNaN(num)) {
    return "N/A";
  }

  if (config === MoneyConfig.Default) {
    return num?.toFixed(3);
  } else if (config === MoneyConfig.AxieUnit) {
    return (num / AxieBaseUnit).toFixed(3);
  }
};
