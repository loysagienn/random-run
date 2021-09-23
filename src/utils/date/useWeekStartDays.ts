import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentMonthDayIsoDate } from "selectors";
import { MonthDay } from "types";
import { getMonthDayKey, getMonthDate } from "utils";

const getWeekStartDays = (
  monthKey: string,
  currentMonthDayIsoDate: string
): MonthDay[] => {
  const date = getMonthDate(monthKey);
  const currentDate = new Date(currentMonthDayIsoDate);
  const currentTimestamp = currentDate.getTime();

  date.setDate(date.getDate() - 1);

  const dates: MonthDay[] = [];

  while (date.getDay() !== 0) {
    const timestamp = date.getTime();
    const monthDay = date.getDate();
    const weekDay = date.getDay();
    const monthDayKey = getMonthDayKey(date);

    dates.push({
      isoDate: date.toISOString(),
      disabled: timestamp < currentTimestamp,
      monthDay,
      isToday: timestamp === currentTimestamp,
      timestamp,
      isWeekend: weekDay === 6 || weekDay === 0,
      weekDay,
      monthDayKey,
    });

    date.setDate(monthDay - 1);
  }

  return dates;
};

export const useWeekStartDays = (monthKey: string): MonthDay[] => {
  const currentMonthDayIsoDate = useSelector(selectCurrentMonthDayIsoDate);

  return useMemo(
    () => getWeekStartDays(monthKey, currentMonthDayIsoDate),
    [monthKey, currentMonthDayIsoDate]
  );
};
