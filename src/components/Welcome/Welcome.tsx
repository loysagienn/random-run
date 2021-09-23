import React from "react";
import { Button, ButtonStyle } from "components/Button";
import css from "./Welcome.styl";

export function Welcome() {
  return (
    <div className={css.root}>
      <div className={css.content}>
        <div className={css.logo}>random-run.ru</div>
        <div className={css.description}>Найди компанию для пробежки</div>
        <Button
          className={css.button}
          style={ButtonStyle.Strava}
          href="/auth-strava"
        >
          Войти через <span className={css.strava}>Strava</span>
        </Button>
      </div>
    </div>
  );
}
