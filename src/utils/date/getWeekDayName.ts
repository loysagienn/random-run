import { getMonthDayDate } from "utils";

const weekDayNames = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export const getWeekDayName = (monthDayKey: string): string => {
  const date = getMonthDayDate(monthDayKey);

  const weekDayName = weekDayNames[date.getDay()];

  return weekDayName;
};
