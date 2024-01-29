export const redirectMarketLand = (row: number, col: number) => {
  window.open(
    `https://app.axieinfinity.com/marketplace/lands/${row}/${col}`,
    "_blank"
  );
};
