const AxieBaseUnit = 1000000000000000000;
const MavisBaseUnit = 1000000000000000000;

export enum MoneyConfig {
  Default = "default",
  AxieUnit = "AxieUnit",
  MavisUnit = "MavisUnit",
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
  } else if (config === MoneyConfig.AxieUnit) {
    return parseFloat((num / AxieBaseUnit).toFixed(3));
  } else if (config === MoneyConfig.MavisUnit) {
    return parseFloat((num / MavisBaseUnit).toFixed(0));
  }
};
