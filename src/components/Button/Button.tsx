import React, { useMemo } from "react";
import type { ReactNode, SyntheticEvent } from "react";
import { cn } from "utils";
import css from "./Button.styl";

export enum ButtonStyle {
  Default = "default",
  White = "white",
  Strava = "strava",
  Light = "light",
}

export enum ButtonSize {
  XS = "xs",
  S = "s",
  M = "m",
}

type Props = {
  children: ReactNode;
  onClick?: (event: SyntheticEvent) => void;
  href?: string;
  newPage?: boolean;
  className?: string;
  style?: ButtonStyle;
  size?: ButtonSize;
};

export const Button = ({
  children,
  onClick,
  href,
  newPage,
  className,
  style = ButtonStyle.Default,
  size = ButtonSize.M,
}: Props) => {
  const rootClassName = cn(css.root, className);
  const contentClassName = cn(
    css.content,
    css[`style_${style}`],
    css[`size_${size}`]
  );

  if (href) {
    return (
      <a
        className={rootClassName}
        href={href}
        onClick={onClick}
        target={newPage ? "_blank" : "_self"}
        rel="noopener noreferrer"
      >
        <div className={contentClassName}>{children}</div>
      </a>
    );
  }

  return (
    <div className={rootClassName} onClick={onClick}>
      <div className={contentClassName}>{children}</div>
    </div>
  );
};
