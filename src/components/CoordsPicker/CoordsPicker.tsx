import React, { useRef, useEffect, MutableRefObject } from "react";
import type { Coords } from "types";
import { YandexMap, Circle } from "components/YandexMap";
import css from "./CoordsPicker.styl";

type Props = {
  coords: Coords;
  onChange: (coords: Coords) => void;
  className?: string;
};

export const CoordsPicker = ({ coords, className, onChange }: Props) => {
  const mapRef = useRef<YandexMap>(null);
  const pointRef = useRef<Circle>(null) as MutableRefObject<Circle>;

  useEffect(() => {
    if (mapRef.current) {
      if (pointRef.current) {
        pointRef.current.setCoords(coords);
      } else {
        const circle = mapRef.current.createCircle(coords, {
          radius: 300,
          draggable: true,
        });

        circle.on("dragend", onChange);

        pointRef.current = circle;
      }
    }
  }, [coords]);

  return (
    <YandexMap
      ref={mapRef}
      className={className || css.map}
      centerCoords={coords}
      onClick={onChange}
    />
  );
};
