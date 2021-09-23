import React from "react";
import type { SyntheticEvent } from "react";
import { SvgCross } from "components/Svg";
import css from "./Popup.styl";

type Props = {
  title: string;
  onClose?: (event: SyntheticEvent) => void;
};

export const PopupHeader = ({ title, onClose }: Props) => {
  return (
    <div className={css.header}>
      <div className={css.title}>{title}</div>
      {onClose && <SvgCross onClick={onClose} className={css.closeBtn} />}
    </div>
  );
};
