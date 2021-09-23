import React, {
  memo,
  useMemo,
  useState,
  useCallback,
  PureComponent,
  createRef,
} from "react";
import type { RefObject, SyntheticEvent } from "react";
import { cn, stringifyNumber } from "utils";
import css from "./TimePicker.styl";
import { HOURS, MINUTES, MINUTES_POSITIONS, HOURS_POSITIONS } from "./utils";

type Props = {
  value: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  onDragChange?: (value: string) => void;
  className?: string;
};

type DivRef = RefObject<HTMLDivElement>;
type Hour = typeof HOURS[number];
type HoursRefs = { [key in Hour]: DivRef };
type HoursVisible = { [key in Hour]: boolean };
type Minute = typeof MINUTES[number];

const createHoursRefs = (): HoursRefs =>
  HOURS.reduce(
    (acc, hour) => Object.assign(acc, { [hour]: createRef() }),
    {} as HoursRefs
  );

const createHoursTextRefs = (): HoursRefs =>
  HOURS.reduce(
    (acc, hour) => Object.assign(acc, { [hour]: createRef() }),
    {} as HoursRefs
  );

const createHoursVisible = (): HoursVisible =>
  HOURS.reduce(
    (acc, hour) => Object.assign(acc, { [hour]: true }),
    {} as HoursVisible
  );

export class TimePicker extends PureComponent<Props, {}> {
  hoursRefs: HoursRefs = createHoursRefs();
  hoursTextRefs: HoursRefs = createHoursTextRefs();
  hoursVisible: HoursVisible = createHoursVisible();
  activeMinuteArrowRef: DivRef = createRef();
  activeHourArrowRef: DivRef = createRef();
  activeMinuteValueRef: DivRef = createRef();
  activeHourValueRef: DivRef = createRef();
  rootRef: DivRef = createRef();
  hourAngle: number = 0;
  minuteAngle: number = 0;
  dragHour: boolean = false;
  dragMinute: boolean = false;
  centerPosition: [number, number] = [0, 0];
  propsHour: Hour = 0;
  propsMinute: Minute = 0;

  updatePropsTime() {
    const [hoursStr, minuteStr] = this.props.value.split(":");

    this.propsHour = Number(hoursStr) as Hour;
    this.propsMinute = Number(minuteStr) as Minute;
  }

  setCenterPosition() {
    if (this.rootRef.current) {
      const rootRect = this.rootRef.current.getBoundingClientRect();

      const centerLeft = (rootRect.left + rootRect.right) / 2;
      const centerTop = (rootRect.top + rootRect.bottom) / 2;

      this.centerPosition = [centerLeft, centerTop];
    }
  }

  getEventAngle(event: MouseEvent | TouchEvent) {
    const [centerLeft, centerTop] = this.centerPosition;

    const { clientX, clientY } =
      event instanceof TouchEvent ? event.touches[0] : event;

    let angleRad = 0;

    if (centerTop === clientY) {
      angleRad = clientX > centerLeft ? Math.PI * 0.5 : Math.PI * 1.5;
    } else if (centerTop > clientY) {
      angleRad = Math.atan((clientX - centerLeft) / (centerTop - clientY));
    } else {
      angleRad =
        Math.atan((clientX - centerLeft) / (centerTop - clientY)) - Math.PI;
    }

    let angle = (angleRad * 180) / Math.PI;

    if (angle < -15) {
      angle = angle + 360;
    } else if (angle > 345) {
      angle = angle - 360;
    }

    return angle;
  }

  onHourDrag = (event: MouseEvent | TouchEvent) => {
    let angle = this.getEventAngle(event);

    while (Math.abs(this.hourAngle - angle) > 180) {
      angle += 360;

      if (angle > 1080) {
        angle -= 1440;
      }
    }

    if (angle > 705) {
      angle -= 720;
    } else if (angle < -15) {
      angle += 720;
    }

    this.setHourAngle(angle);

    if (this.props.onDragChange) {
      const hour = this.getDragHour();

      this.props.onDragChange(
        `${stringifyNumber(hour, 2)}:${stringifyNumber(this.propsMinute, 2)}`
      );
    }

    return false;
  };

  onMinuteDrag = (event: MouseEvent | TouchEvent) => {
    const angle = this.getEventAngle(event);

    event.preventDefault();

    this.setMinuteAngle(angle);

    if (this.props.onDragChange) {
      const minute = this.getDragMinute();

      this.props.onDragChange(
        `${stringifyNumber(this.propsHour, 2)}:${stringifyNumber(minute, 2)}`
      );
    }

    return false;
  };

  dragHourStart = (event: MouseEvent | TouchEvent) => {
    this.setCenterPosition();

    this.dragHour = true;

    event.preventDefault();

    window.addEventListener("mousemove", this.onHourDrag, { passive: false });
    window.addEventListener("touchmove", this.onHourDrag, { passive: false });
    window.addEventListener("mouseup", this.dragHourStop, { passive: false });
    window.addEventListener("touchend", this.dragHourStop, { passive: false });

    if (this.activeHourArrowRef.current) {
      this.activeHourArrowRef.current.style.transition = "none";
    }

    return false;
  };

  dragMinuteStart = (event: MouseEvent | TouchEvent) => {
    this.setCenterPosition();

    this.dragMinute = true;

    event.preventDefault();

    window.addEventListener("mousemove", this.onMinuteDrag, { passive: false });
    window.addEventListener("touchmove", this.onMinuteDrag, { passive: false });
    window.addEventListener("mouseup", this.dragMinuteStop, { passive: false });
    window.addEventListener("touchend", this.dragMinuteStop, {
      passive: false,
    });

    if (this.activeMinuteArrowRef.current) {
      this.activeMinuteArrowRef.current.style.transition = "none";
    }

    return false;
  };

  dragHourStop = (event: MouseEvent | TouchEvent) => {
    window.removeEventListener("mousemove", this.onHourDrag);
    window.removeEventListener("touchmove", this.onHourDrag);
    window.removeEventListener("mouseup", this.dragHourStop);
    window.removeEventListener("touchend", this.dragHourStop);

    if (this.activeHourArrowRef.current) {
      this.activeHourArrowRef.current.style.transition =
        "transform 0.2s ease-in-out";
    }

    this.dragHour = false;

    const hour = this.getDragHour();

    this.onChangeHour(hour);

    this.updateOnRender();
  };

  dragMinuteStop = (event: MouseEvent | TouchEvent) => {
    window.removeEventListener("mousemove", this.onMinuteDrag);
    window.removeEventListener("touchmove", this.onMinuteDrag);
    window.removeEventListener("mouseup", this.dragMinuteStop);
    window.removeEventListener("touchend", this.dragMinuteStop);

    if (this.activeMinuteArrowRef.current) {
      this.activeMinuteArrowRef.current.style.transition =
        "transform 0.2s ease-in-out";
    }

    this.dragMinute = false;

    const minute = this.getDragMinute();

    this.onChangeMinute(minute);

    this.updateOnRender();
  };

  getDragHour() {
    let hourIndex = Math.round(this.hourAngle / 30);

    if (hourIndex > 23 || hourIndex < 0) {
      hourIndex = 0;
    }

    return HOURS[hourIndex];
  }

  getDragMinute() {
    let minuteIndex = Math.round(this.minuteAngle / 30);

    if (minuteIndex > 11 || minuteIndex < 0) {
      minuteIndex = 0;
    }

    return MINUTES[minuteIndex];
  }

  onChangeMinute(minute: Minute) {
    if (minute === this.propsMinute) {
      return;
    }

    this.props.onChange(
      `${stringifyNumber(this.propsHour, 2)}:${stringifyNumber(minute, 2)}`
    );
  }

  onChangeHour(hour: Hour) {
    if (hour === this.propsHour) {
      return;
    }

    this.props.onChange(
      `${stringifyNumber(hour, 2)}:${stringifyNumber(this.propsMinute, 2)}`
    );
  }

  setMinuteAngle(angle: number) {
    this.minuteAngle = angle;

    if (this.activeMinuteArrowRef.current) {
      this.activeMinuteArrowRef.current.style.transform = `rotate(${angle}deg)`;
    }
  }

  setHourAngle(angle: number) {
    this.hourAngle = angle;

    if (this.activeHourArrowRef.current) {
      this.activeHourArrowRef.current.style.transform = `rotate(${angle}deg)`;
    }

    this.updateHoursVisible();
  }

  setHourVisible(hour: Hour, visible: boolean) {
    if (this.hoursVisible[hour] === visible) {
      return;
    }

    this.hoursVisible[hour] = visible;
    const hourNode = this.hoursRefs[hour].current;
    const hourTextNode = this.hoursTextRefs[hour].current;

    if (!hourNode || !hourTextNode) {
      return;
    }

    if (visible) {
      hourNode.style.display = "block";
      hourTextNode.style.transform = "scale(1, 1)";
      hourTextNode.style.opacity = "1";
    } else {
      hourNode.style.display = "none";
      hourTextNode.style.transform = "scale(0.1, 0.1)";
      hourTextNode.style.opacity = "0";
    }
  }

  updateHoursVisible() {
    let hourIndex = Math.floor(this.hourAngle / 30);

    if (hourIndex > 23 || hourIndex < 0) {
      hourIndex = 0;
    }

    const currentHour = HOURS[hourIndex];

    let targetHour = currentHour + 6;

    if (targetHour > 23) {
      targetHour = targetHour - 24;
    }

    for (let i = 0; i < HOURS.length; i++) {
      const hour = HOURS[i];

      const virtualHour = targetHour < hour ? hour - 24 : hour;

      const diff = targetHour - virtualHour;

      const visible = diff < 12;

      this.setHourVisible(hour, visible);
    }
  }

  updateOnRender() {
    if (!this.dragMinute) {
      this.setMinuteAngle((360 / 60) * this.propsMinute);
    }

    if (!this.dragHour) {
      this.setHourAngle((360 / 12) * this.propsHour);
    }
  }

  render() {
    this.updatePropsTime();

    return (
      <div className={cn(css.root, this.props.className)} ref={this.rootRef}>
        <div className={css.center} />

        {MINUTES.map((minute, index) => {
          return (
            <div
              className={css.minuteValue}
              key={minute}
              style={MINUTES_POSITIONS[index]}
              onClick={() => this.onChangeMinute(minute)}
            />
          );
        })}

        {HOURS.map((hour, index) => {
          return (
            <div
              ref={this.hoursRefs[hour]}
              className={css.hourValue}
              key={hour}
              style={HOURS_POSITIONS[index]}
              onClick={() => this.onChangeHour(hour)}
            />
          );
        })}

        <div className={css.minuteArrow} ref={this.activeMinuteArrowRef}>
          <div className={css.arrow} />
          <div className={css.value} ref={this.activeMinuteValueRef} />
        </div>

        <div className={css.hourArrow} ref={this.activeHourArrowRef}>
          <div className={css.arrow} />
          <div className={css.value} ref={this.activeHourValueRef} />
        </div>

        {MINUTES.map((minute, index) => {
          return (
            <div
              className={css.minuteTextValue}
              key={minute}
              style={MINUTES_POSITIONS[index]}
            >
              {minute}
            </div>
          );
        })}

        {HOURS.map((hour, index) => {
          return (
            <div
              ref={this.hoursTextRefs[hour]}
              className={css.hourTextValue}
              key={hour}
              style={HOURS_POSITIONS[index]}
            >
              {hour}
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    this.updateOnRender();

    if (this.activeMinuteValueRef.current) {
      this.activeMinuteValueRef.current.addEventListener(
        "touchstart",
        this.dragMinuteStart,
        { passive: false }
      );

      this.activeMinuteValueRef.current.addEventListener(
        "mousedown",
        this.dragMinuteStart,
        { passive: false }
      );
    }

    if (this.activeHourValueRef.current) {
      this.activeHourValueRef.current.addEventListener(
        "touchstart",
        this.dragHourStart,
        { passive: false }
      );

      this.activeHourValueRef.current.addEventListener(
        "mousedown",
        this.dragHourStart,
        { passive: false }
      );
    }
  }

  componentDidUpdate() {
    this.updateOnRender();
  }
}
