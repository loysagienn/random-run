import { Component } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  timeout?: number;
};

export class HideWithTimeout extends Component<Props, {}> {
  static defaultProps = {
    timeout: 300,
  };
  private hideTimeout: NodeJS.Timeout | null = null;
  private lastChildren: ReactNode = null;

  render() {
    const { children } = this.props;

    if (children) {
      this.lastChildren = children;

      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);

        this.hideTimeout = null;
      }

      return children;
    }

    if (this.lastChildren && !this.hideTimeout) {
      this.hideTimeout = setTimeout(() => {
        this.lastChildren = null;
        this.hideTimeout = null;
        this.forceUpdate();
      }, this.props.timeout);
    }

    return this.lastChildren;
  }
}
