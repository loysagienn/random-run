import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { cn } from "utils";
import { Athlete } from "types";
import { selectAthlete } from "selectors";

import css from "./Header.styl";

type Props = {
  athlete: Athlete;
  className?: string;
};

export const Header = ({ athlete, className }: Props) => {
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
        {!athlete.profile && `${athlete.firstname} ${athlete.lastname}`}
        {athlete.profile && (
          <div className={css.userImage} style={userImageStyle} />
        )}
      </div>
    </div>
  );
};
