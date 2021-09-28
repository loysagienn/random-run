import { getMonthDayDate } from "utils";

export const getTimestamp = (monthDayKey: string, timeKey: string): number => {
  const date = getMonthDayDate(monthDayKey);

  const [hoursStr, minutesStr] = timeKey.split(":");
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  date.setHours(hours, minutes, 0, 0);

  return Math.round(date.getTime() / 1000);
};
