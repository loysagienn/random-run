import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectCurrentMonthDayKey } from "selectors";
import { cn } from "utils";
import { Button, ButtonStyle, ButtonSize } from "components/Button";
import { DatePicker } from "components/DatePicker";
import { useDateValue } from "./useDateValue";
import { Header } from "./Header";
import css from "./PartyDraft.styl";

type Props = {
  onChange: (monthDayKey: string) => void;
  monthDayKey?: string | null;
  onClose?: () => void;
};

export const DateSelector = ({ onChange, monthDayKey, onClose }: Props) => {
  const currentMonthDayKey = useSelector(selectCurrentMonthDayKey);

  const [activeMonthDayKey, setMonthDayKey] = useState<string>(
    monthDayKey || currentMonthDayKey
  );

  const dateText = useDateValue(activeMonthDayKey);

  const submit = useCallback(
    () => onChange(activeMonthDayKey),
    [onChange, activeMonthDayKey]
  );

  return (
    <>
      <Header title="Новая пробежка" value={dateText} onClose={onClose} />

      <div className={css.dateSelector}>
        <DatePicker
          onChange={setMonthDayKey}
          monthDayKey={activeMonthDayKey}
          className={css.datePicker}
        />
      </div>
      <div className={cn(css.buttons, css.dateSelectorButtons)}>
        <Button
          style={ButtonStyle.Default}
          size={ButtonSize.M}
          onClick={submit}
        >
          Далее
        </Button>
      </div>
    </>
  );
};
