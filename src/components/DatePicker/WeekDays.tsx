import React from "react";
import { cn } from "utils";
import css from "./DatePicker.styl";

export const WeekDays = () => {
  return (
    <>
      <div className={cn(css.cell, css.weekDay, css.isMonday)}>пн</div>
      <div className={cn(css.cell, css.weekDay)}>вт</div>
      <div className={cn(css.cell, css.weekDay)}>ср</div>
      <div className={cn(css.cell, css.weekDay)}>чт</div>
      <div className={cn(css.cell, css.weekDay)}>пт</div>
      <div className={cn(css.cell, css.weekDay, css.isWeekend)}>сб</div>
      <div className={cn(css.cell, css.weekDay, css.isWeekend)}>вс</div>
    </>
  );
};
