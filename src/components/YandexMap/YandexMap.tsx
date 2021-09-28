import React, { PureComponent } from "react";
import { generateId } from "utils";
import { Coords } from "types";
import { Circle } from "./Circle";

type Props = {
  className?: string;
  centerCoords?: Coords;
  onClick?: (coords: Coords) => void;
};

const DEFAULT_CENTER = [55.76, 37.64];

type CircleOptions = {
  radius?: number;
  draggable?: boolean;
};

export class YandexMap extends PureComponent<Props, {}> {
  mapId: string = generateId(10);
  map: ymaps.Map | null = null;
  initMapQueue: ((map: ymaps.Map) => void)[] = [];

  createCircle(coords: Coords, options?: CircleOptions): Circle {
    const circle = new Circle(coords, options);

    this.mapAction((map) => map.geoObjects.add(circle.circle));

    return circle;
  }

  initMap = () => {
    // Создание карты.
    const map = new window.ymaps.Map(this.mapId, {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: this.props.centerCoords || DEFAULT_CENTER,
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 11,
      controls: ["typeSelector", "fullscreenControl", "zoomControl"],
    });

    this.map = map;

    this.initMapQueue.forEach((fn) => fn(map));

    map.events.add("click", this.onMapClick);
  };

  onMapClick = (event: ymaps.IEvent) => {
    const coords = event.get("coords");

    if (this.props.onClick) {
      this.props.onClick(coords as Coords);
    }
  };

  mapAction(fn: (map: ymaps.Map) => void): void {
    if (this.map) {
      return fn(this.map);
    }

    this.initMapQueue.push(fn);
  }

  render() {
    const { className } = this.props;

    return <div id={this.mapId} className={className} />;
  }

  componentDidMount() {
    window.ymaps.ready(this.initMap);
  }
}
