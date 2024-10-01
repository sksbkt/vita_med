export const formatDuration = (value: number) => {
  const seconds = Math.round(value % 60);
  const minutes = Math.round(value / 60) % 60;
  const hours = Math.round(value / 3600);
  return `${hours > 0 ? `${minDigit(hours, 2)}:` : ""}${minDigit(
    minutes,
    2
  )}:${minDigit(seconds, 2)}`;
};

// const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
//   minimumIntegerDigits: 2,
// });

export const minDigit = (input: number, digits: number) => {
  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: digits,
    useGrouping: false,
  });
  return leadingZeroFormatter.format(input);
};
