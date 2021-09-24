import React, { useState, useCallback, useRef } from "react";
import { cn } from "utils";
import { Button, ButtonStyle, ButtonSize } from "components/Button";
import { Coords } from "types";
import { CoordsPicker } from "components/CoordsPicker";
import { useDateValue } from "./useDateValue";
import { Header } from "./Header";
import css from "./PartyDraft.styl";

const DEFAULT_COORDS: Coords = [0, 0];

type Props = {
  onChange: (coords: Coords) => void;
  monthDayKey: string;
  timeKey: string;
  coords?: Coords | null;
  onClose?: () => void;
};

export const CoordsSelector = ({
  onChange,
  monthDayKey,
  timeKey,
  coords,
  onClose,
}: Props) => {
  const [activeCoords, setActiveCoords] = useState<Coords>(
    coords || DEFAULT_COORDS
  );
  const dateText = useDateValue(monthDayKey);

  const submit = useCallback(
    () => onChange(activeCoords),
    [onChange, activeCoords]
  );

  return (
    <>
      <Header
        title={`${dateText}, ${timeKey}`}
        value={"Где?"}
        onClose={onClose}
      />

      <CoordsPicker
        coords={activeCoords}
        onChange={setActiveCoords}
        className={css.coordsSelector}
      />
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
