export const getMonthDate = (monthKey: string): Date => {
  const [year, month] = monthKey.split("-");

  return new Date(Number(year), Number(month) - 1);
};
