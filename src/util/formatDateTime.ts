export const formatDateTime = (unformatValue: string | number | Date) => {
  return new Date(unformatValue * 1000).toLocaleString();
};
