import React from "react";
import { useSelector } from "react-redux";
import { selectAthlete } from "selectors";
import { Welcome } from "components/Welcome";
import { Header } from "components/Header";
import { Parties } from "components/Parties";
import { PopupContainer } from "components/Popup";
import { PartyDraft } from "components/PartyDraft";
import css from "./Root.styl";

export const Root = () => {
  const athlete = useSelector(selectAthlete);

  return (
    <div className={css.root}>
      <PopupContainer>
        {athlete && (
          <div className={css.layout}>
            <Header athlete={athlete} className={css.header} />
            <div className={css.content}>
              <Parties />
            </div>
          </div>
        )}
        {!athlete && <Welcome />}
        <PartyDraft />
      </PopupContainer>
    </div>
  );
};
