import React, { createRef } from "react";
import type { ReactNode } from "react";
import { Provider } from "./utils";
import css from "./Popup.styl";

type Props = {
  children: ReactNode;
};

export const PopupContainer = ({ children }: Props) => {
  const ref = createRef<HTMLDivElement>();

  return (
    <>
      <Provider value={ref}>{children}</Provider>
      <div className={css.container} ref={ref}></div>
    </>
  );
};
