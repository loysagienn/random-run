import React from "react";
import type { Coords } from "types";
import { YandexMap } from "components/YandexMap";
import css from "./CoordsPicker.styl";

type Props = {
  coords: Coords;
  onChange: (coords: Coords) => void;
  className?: string;
};

export const CoordsPicker = ({ coords, className }: Props) => {
  return <YandexMap className={className || css.map} />;
};
