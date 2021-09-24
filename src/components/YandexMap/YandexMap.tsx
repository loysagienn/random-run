import React, { PureComponent } from "react";
import { generateId } from "utils";

type Props = {
  className?: string;
};

export class YandexMap extends PureComponent<Props, {}> {
  mapId: string = generateId(10);

  initMap = () => {
    // Создание карты.
    const myMap = new window.ymaps.Map(this.mapId, {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.76, 37.64],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 10,
    });
  };

  render() {
    const { className } = this.props;

    return <div id={this.mapId} className={className} />;
  }

  componentDidMount() {
    window.ymaps.ready(this.initMap);
  }
}
