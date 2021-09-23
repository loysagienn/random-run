import React, { useState, useCallback, useRef } from "react";
import { TimePicker } from "components/TimePicker";
import { cn } from "utils";
import { Button, ButtonStyle, ButtonSize } from "components/Button";
import { useDateValue } from "./useDateValue";
import { Header } from "./Header";
import css from "./PartyDraft.styl";

type Props = {
  onChange: (timeKey: string) => void;
  monthDayKey: string;
  timeKey?: string | null;
  onClose?: () => void;
};

const DEFAULT_TIME_KEY = "13:20";

export const TimeSelector = ({
  timeKey,
  monthDayKey,
  onChange,
  onClose,
}: Props) => {
  const valueRef = useRef<HTMLDivElement>(null);
  const [activeTimeKey, setTimeKey] = useState(timeKey || DEFAULT_TIME_KEY);
  const dateText = useDateValue(monthDayKey);
  const submit = useCallback(
    () => onChange(activeTimeKey),
    [onChange, activeTimeKey]
  );

  const onDragChange = useCallback((value: string) => {
    if (valueRef.current) {
      valueRef.current.textContent = `Время: ${value}`;
    }
  }, []);

  return (
    <>
      <Header
        title={dateText}
        value={`Время: ${activeTimeKey}`}
        onClose={onClose}
        valueRef={valueRef}
      />

      <div className={css.timeSelector}>
        <TimePicker
          value={activeTimeKey}
          onChange={setTimeKey}
          onDragChange={onDragChange}
          className={css.timePicker}
        />
      </div>
      <div className={cn(css.buttons, css.timeSelectorButtons)}>
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
