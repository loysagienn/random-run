import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectCurrentMonthKey } from "selectors";
import {
  useMonthDays,
  useWeekStartDays,
  cn,
  getMonthName,
  getNextMonth,
  getPrevMonth,
} from "utils";
import { MonthDay } from "types";
import { SvgArrowTop } from "components/Svg";
import { WeekDays } from "./WeekDays";
import css from "./DatePicker.styl";

type Props = {
  onChange: (monthDayKey: string) => void;
  size?: "m";
  monthDayKey?: string | null;
  className?: string;
};

type DayProps = {
  day: MonthDay;
  onChange: (monthDayKey: string) => void;
  isPrevMonth?: boolean;
  monthDayKey?: string | null;
};

const Day = ({ day, isPrevMonth, onChange, monthDayKey }: DayProps) => {
  const onClick = useCallback(() => {
    if (day.disabled || isPrevMonth) {
      return;
    }

    onChange(day.monthDayKey);
  }, [day, isPrevMonth]);

  const className = cn(
    css.cell,
    css.day,
    (day.disabled || isPrevMonth) && css.disabled,
    day.isToday && css.isToday,
    day.weekDay === 1 && css.isMonday,
    day.isWeekend && css.isWeekend,
    day.monthDayKey === monthDayKey && css.isActive
  );

  return (
    <div className={className} onClick={onClick}>
      {!isPrevMonth && day.monthDay}
    </div>
  );
};

export const DatePicker = ({
  size = "m",
  onChange,
  monthDayKey,
  className,
}: Props) => {
  const currentMonthKey = useSelector(selectCurrentMonthKey);
  const [monthKey, setMonthKey] = useState(currentMonthKey);
  const monthDays = useMonthDays(monthKey);
  const weekStartDays = useWeekStartDays(monthKey);
  const monthName = getMonthName(monthKey);
  const setPrevMonth = useCallback(
    () => setMonthKey(getPrevMonth(monthKey)),
    [monthKey]
  );
  const setNextMonth = useCallback(
    () => setMonthKey(getNextMonth(monthKey)),
    [monthKey]
  );

  return (
    <div className={cn(css.root, css[`size_${size}`], className)}>
      <div className={cn(css.arrowLeft, css.cell)} onClick={setPrevMonth}>
        <SvgArrowTop />
      </div>
      <div className={css.monthName}>{monthName}</div>
      <div className={cn(css.arrowRight, css.cell)} onClick={setNextMonth}>
        <SvgArrowTop />
      </div>
      <WeekDays />
      {weekStartDays.map((day) => (
        <Day day={day} key={day.monthDayKey} onChange={onChange} isPrevMonth />
      ))}
      {monthDays.map((day) => (
        <Day
          day={day}
          key={day.monthDayKey}
          onChange={onChange}
          monthDayKey={monthDayKey}
        />
      ))}
    </div>
  );
};
