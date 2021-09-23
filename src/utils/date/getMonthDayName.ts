import { getMonthDayDate } from "utils";

const monthNames = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const getMonthDayName = (monthDayKey: string): string => {
  const date = getMonthDayDate(monthDayKey);

  const month = monthNames[date.getMonth()];

  return `${date.getDate()} ${month}`;
};
