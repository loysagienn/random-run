import { getMonthDate } from "utils";

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const getMonthName = (monthKey: string): string => {
  const date = getMonthDate(monthKey);

  return monthNames[date.getMonth()];
};
