import React, { useCallback, useRef, useEffect } from "react";
import type { MutableRefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonStyle } from "components/Button";
import { selectParties } from "selectors";
import { newPartyAction } from "actions";
import { YandexMap, Circle } from "components/YandexMap";

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
        Создать пробежку
      </Button>
    </div>
  );
};

type Circles = {
  [key: string]: Circle;
};

export const Parties = () => {
  const mapRef = useRef<YandexMap>(null);
  const circles = useRef<Circles>({}) as MutableRefObject<Circles>;
  const parties = useSelector(selectParties);

  useEffect(() => {
    parties.forEach((party) => {
      const activeCircle = circles.current[party.id];

      if (!activeCircle && mapRef.current) {
        const circle = mapRef.current.createCircle(party.coords, {
          radius: 300,
        });

        circles.current[party.id] = circle;
      }
    });
  }, [parties]);

  return (
    <div className={css.root}>
      <div className={css.content}>
        <YandexMap className={css.map} ref={mapRef} />
      </div>
    </div>
  );
};
