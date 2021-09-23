import React, { RefObject } from "react";
import { SvgCross } from "components/Svg";
import css from "./PartyDraft.styl";

type Props = {
  title: string;
  value?: string;
  onClose?: () => void;
  valueRef?: RefObject<HTMLDivElement>;
};

export const Header = ({ title, value, onClose, valueRef }: Props) => {
  return (
    <div className={css.header}>
      <div className={css.headerTitle}>
        {title}
        {onClose && <SvgCross onClick={onClose} className={css.closeBtn} />}
      </div>
      {value && (
        <div className={css.headerValue} ref={valueRef}>
          {value}
        </div>
      )}
    </div>
  );
};
