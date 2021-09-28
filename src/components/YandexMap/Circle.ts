import { EventEmitter } from "utils";
import { Coords } from "types";
import ymaps from "yandex-maps";

type CircleOptions = {
  radius?: number;
  draggable?: boolean;
};

const DEFAULT_CIRCLE_OPTIONS: CircleOptions = {
  radius: 300,
  draggable: false,
};

type CircleEvents = {
  dragend: (coords: Coords) => void;
  init: (circle: ymaps.Circle) => void;
};

export class Circle extends EventEmitter<CircleEvents> {
  circle: ymaps.Circle | null = null;
  coords: Coords;
  options: CircleOptions;

  initCircle = (): void => {
    const { coords, options } = this;

    const circle = new window.ymaps.Circle(
      [coords, options.radius],
      {},
      {
        draggable: options.draggable,
      }
    );

    circle.events.add("dragend", () => {
      if (circle.geometry) {
        const newCoords = circle.geometry.getCoordinates();

        this.trigger("dragend", newCoords as Coords);
      }
    });

    this.circle = circle;

    this.trigger("init", circle);
  };

  constructor(coords: Coords, propsOptions?: CircleOptions) {
    super();

    const options = Object.assign(
      {},
      DEFAULT_CIRCLE_OPTIONS,
      propsOptions || {}
    );

    this.options = options;
    this.coords = coords;

    window.ymaps.ready(this.initCircle);
  }

  setCoords(coords: Coords) {
    this.coords = coords;

    if (this.circle && this.circle.geometry) {
      this.circle.geometry.setCoordinates(coords);
    }
  }
}
