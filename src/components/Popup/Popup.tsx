import React, {
  Component,
  useContext,
  useEffect,
  useState,
  SyntheticEvent,
} from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { cn } from "utils";
import { HideWithTimeout } from "components/HideWithTimeout";
import { containerContext } from "./utils";
import css from "./Popup.styl";

const SHOW_TIMEOUT = 50;
const HIDE_TIMEOUT = 200;

type Props = {
  children: ReactNode;
  active: boolean;
  onClose?: (event: SyntheticEvent) => void;
  className?: string;
  closeOnOverlayClick?: boolean;
};

class Content extends Component<Props, {}> {
  static defaultProps = {
    closeOnOverlayClick: true,
  };

  private displayed: boolean = false;
  private visible: boolean = false;
  private prevActive: boolean = false;
  private showTimeout: NodeJS.Timeout | null = null;
  private hideTimeout: NodeJS.Timeout | null = null;
  private clickEvent: Event | null = null;

  private onOverlayClick = (event: SyntheticEvent) => {
    const { clickEvent } = this;
    const { closeOnOverlayClick, onClose } = this.props;

    if (closeOnOverlayClick && onClose && event.nativeEvent !== clickEvent) {
      onClose(event);
    }
  };

  private onPopupClick = (event: SyntheticEvent) => {
    this.clickEvent = event.nativeEvent;
  };

  private show() {
    const { displayed, visible, showTimeout, hideTimeout } = this;

    if (hideTimeout) {
      clearTimeout(hideTimeout);

      this.hideTimeout = null;
    }

    if (!displayed) {
      this.displayed = true;

      this.showTimeout = setTimeout(() => {
        this.visible = true;
        this.showTimeout = null;

        this.forceUpdate();
      }, SHOW_TIMEOUT);

      return;
    }

    if (!visible && !showTimeout) {
      this.visible = true;
    }
  }

  private hide() {
    const { displayed, visible, showTimeout, hideTimeout } = this;

    if (showTimeout) {
      clearTimeout(showTimeout);

      this.showTimeout = null;
    }

    if (!displayed || hideTimeout) {
      return;
    }

    this.visible = false;

    this.hideTimeout = setTimeout(() => {
      this.displayed = false;
      this.hideTimeout = null;

      this.forceUpdate();
    }, HIDE_TIMEOUT);
  }

  private toggle() {
    const { prevActive } = this;
    const { active } = this.props;

    if (active === prevActive) {
      return;
    }

    this.prevActive = active;

    if (active) {
      this.show();
    } else {
      this.hide();
    }
  }

  render() {
    this.toggle();
    const { displayed, visible, onPopupClick, onOverlayClick } = this;
    const { className, children, active } = this.props;

    if (!displayed) {
      return null;
    }

    return (
      <div
        className={cn(css.wrapper, visible && css.visible)}
        onClick={onOverlayClick}
      >
        <div className={css.content}>
          <div className={cn(css.popup, className)} onClick={onPopupClick}>
            <HideWithTimeout timeout={HIDE_TIMEOUT}>{children}</HideWithTimeout>
          </div>
        </div>
      </div>
    );
  }
}

export const Popup = (props: Props) => {
  const { children, ...restProps } = props;
  const [isInited, setInited] = useState<boolean>(false);

  const containerRef = useContext(containerContext);

  // No server side rendered Popups because of portal
  useEffect(() => setInited(true), []);

  if (!isInited) {
    return null;
  }

  const content = <Content {...restProps}>{children}</Content>;

  if (containerRef && containerRef.current) {
    return createPortal(content, containerRef.current);
  }

  return content;
};
