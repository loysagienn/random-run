import { useSelector } from "react-redux";
import { selectCurrentMonthDayKey } from "selectors";
import {
  getMonthDayDate,
  getMonthDayKey,
  getMonthDayName,
  getWeekDayName,
} from "utils";

export const useDateValue = (monthDayKey: string) => {
  const currentMonthDayKey = useSelector(selectCurrentMonthDayKey);

  let prefix = "";

  if (monthDayKey === currentMonthDayKey) {
    prefix = "Сегодня";
  } else {
    const date = getMonthDayDate(monthDayKey);
    date.setDate(date.getDate() - 1);

    if (getMonthDayKey(date) === currentMonthDayKey) {
      prefix = "Завтра";
    }
  }

  if (!prefix) {
    prefix = getWeekDayName(monthDayKey);
  }

  let text = getMonthDayName(monthDayKey);

  if (prefix) {
    text = `${prefix}, ${text}`;
  }

  return text;
};
