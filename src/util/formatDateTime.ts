const time = new Date();

const timeFormat = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

export const formatDateTime = (unformatValue: string | number | Date) => {
  return new Date(unformatValue * 1000).toLocaleString();
};

export const formatToLocaleDate = (date: Date) => {
  return date.toLocaleDateString("en-US", timeFormat);
};

export const displayCurrentTime = (): string => {
  return formatToLocaleDate(time);
};
