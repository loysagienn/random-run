import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonStyle } from "components/Button";
import { Popup } from "components/Popup";
import { selectParties } from "selectors";
import { newPartyAction } from "actions";

import css from "./Parties.styl";

const Empty = () => {
  const dispatch = useDispatch();
  const newParty = useCallback(() => dispatch(newPartyAction()), [dispatch]);

  return (
    <div className={css.empty}>
      <div className={css.emptyText}>Тут пока пусто</div>
      <Button
        onClick={newParty}
        style={ButtonStyle.White}
        className={css.emptyAddBtn}
      >
        Хочу побегать
      </Button>
    </div>
  );
};

export const Parties = () => {
  const parties = useSelector(selectParties);

  if (parties.length === 0) {
    return <Empty />;
  }

  return (
    <div className={css.root}>
      <div className={css.content}>
        <div className={css.title}>Запланированные пробежки</div>
      </div>
    </div>
  );
};
