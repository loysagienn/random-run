import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearPartyDraftAction, setPartyDraftAction } from "actions";
import { selectPartyDraft } from "selectors";
import { getMonthDayName } from "utils";
import { Popup, PopupHeader } from "components/Popup";
import { DateSelector } from "./DateSelector";
import { TimeSelector } from "./TimeSelector";
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

  if (!partyDraft) {
    return null;
  }

  if (!partyDraft.monthDayKey) {
    return <DateSelector onChange={onDateChange} onClose={onClose} />;
  }

  const monthDayName = getMonthDayName(partyDraft.monthDayKey);

  if (!partyDraft.timeKey) {
    return (
      <>
        <TimeSelector
          monthDayKey={partyDraft.monthDayKey}
          onChange={onTimeChange}
          onClose={onClose}
        />
      </>
    );
  }

  return (
    <>
      <PopupHeader
        title={`${monthDayName}, ${partyDraft.timeKey}`}
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
