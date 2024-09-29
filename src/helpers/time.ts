export const formatDuration = (value: number) => {
  const seconds = Math.round(value % 60);
  const minutes = Math.round(value / 60) % 60;
  const hours = Math.round(value / 3600);
  return `${hours > 0 ? `${hours}:` : ""}${leadingZeroFormatter.format(
    minutes
  )}:${leadingZeroFormatter.format(seconds)}`;
};

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});
