import { EventEmitter } from "utils";
import { Coords } from "types";

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
};

export class Circle extends EventEmitter<CircleEvents> {
  circle: ymaps.Circle;
  options: CircleOptions;

  constructor(coords: Coords, propsOptions?: CircleOptions) {
    super();

    const options = Object.assign(
      {},
      DEFAULT_CIRCLE_OPTIONS,
      propsOptions || {}
    );

    this.options = options;

    this.circle = new window.ymaps.Circle(
      [coords, options.radius],
      {},
      {
        draggable: options.draggable,
      }
    );

    this.circle.events.add("dragend", () => {
      if (this.circle.geometry) {
        const newCoords = this.circle.geometry.getCoordinates();

        this.trigger("dragend", newCoords as Coords);
      }
    });
  }

  setCoords(coords: Coords) {
    if (this.circle.geometry) {
      this.circle.geometry.setCoordinates(coords);
    }
  }
}
