import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearPartyDraftAction, setPartyDraftAction } from "actions";
import { selectPartyDraft } from "selectors";
import { getMonthDayName } from "utils";
import { Popup, PopupHeader } from "components/Popup";
import { DateSelector } from "./DateSelector";
import { TimeSelector } from "./TimeSelector";
import { CoordsSelector } from "./CoordsSelector";
import { Header } from "./Header";
import { useDateValue } from "./useDateValue";
import css from "./PartyDraft.styl";

const DateSelect = {};

const usePopupContent = () => {
  const dispatch = useDispatch();
  const partyDraft = useSelector(selectPartyDraft);
  const onClose = useCallback(
    () => dispatch(clearPartyDraftAction()),
    [dispatch]
  );
  const onDateChange = useCallback(
    (monthDayKey) => dispatch(setPartyDraftAction({ monthDayKey })),
    [dispatch]
  );
  const onTimeChange = useCallback(
    (timeKey) => dispatch(setPartyDraftAction({ timeKey })),
    [dispatch]
  );
  const onCoordsChange = useCallback(
    (coords) => dispatch(setPartyDraftAction({ coords })),
    [dispatch]
  );

  const dateValueText = useDateValue(partyDraft && partyDraft.monthDayKey);

  if (!partyDraft) {
    return null;
  }

  if (!partyDraft.monthDayKey) {
    return <DateSelector onChange={onDateChange} onClose={onClose} />;
  }

  if (!partyDraft.timeKey) {
    return (
      <TimeSelector
        monthDayKey={partyDraft.monthDayKey}
        onChange={onTimeChange}
        onClose={onClose}
      />
    );
  }

  if (!partyDraft.coords) {
    return (
      <CoordsSelector
        onChange={onCoordsChange}
        monthDayKey={partyDraft.monthDayKey}
        timeKey={partyDraft.timeKey}
        onClose={onClose}
      />
    );
  }

  return (
    <>
      <Header
        title={"Новая пробежка"}
        value={`${dateValueText}, ${
          partyDraft.timeKey
        }, ${partyDraft.coords.join(", ")}`}
        onClose={onClose}
      />
    </>
  );
};

export const PartyDraft = () => {
  const dispatch = useDispatch();

  const onClose = useCallback(
    () => dispatch(clearPartyDraftAction()),
    [dispatch]
  );

  const content = usePopupContent();

  return (
    <Popup
      active={Boolean(content)}
      onClose={onClose}
      className={css.popup}
      closeOnOverlayClick={false}
    >
      {content}
    </Popup>
  );
};
