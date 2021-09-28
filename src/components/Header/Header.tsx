import React, { useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonStyle, ButtonSize } from "components/Button";
import { cn } from "utils";
import { Athlete } from "types";
import { newPartyAction } from "actions";

import css from "./Header.styl";

type Props = {
  athlete: Athlete;
  className?: string;
};

export const Header = ({ athlete, className }: Props) => {
  const dispatch = useDispatch();
  const newParty = useCallback(() => dispatch(newPartyAction()), [dispatch]);
  const userImageStyle = useMemo(
    () => ({
      backgroundImage: `url(${athlete.profile})`,
    }),
    [athlete]
  );

  return (
    <div className={cn(css.root, className)}>
      <div className={css.logo}>random-run.ru</div>
      <div className={css.user}>
        <Button
          onClick={newParty}
          style={ButtonStyle.Default}
          className={css.createParty}
          size={ButtonSize.S}
        >
          Создать пробежку
        </Button>
        {!athlete.profile && `${athlete.firstname} ${athlete.lastname}`}
        {athlete.profile && (
          <div className={css.userImage} style={userImageStyle} />
        )}
      </div>
    </div>
  );
};
