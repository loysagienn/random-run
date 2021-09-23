export const getMonthDayDate = (monthDayKey: string): Date => {
  const [year, month, day] = monthDayKey.split("-");

  return new Date(Number(year), Number(month) - 1, Number(day));
};
