type Events = {
  [key: string]: (...args: any[]) => any;
};

type Handlers<TEvents extends Events> = {
  [key in keyof TEvents]?: Set<TEvents[key]>;
};

export class EventEmitter<TEvents extends Events> {
  eventHandlers: Handlers<TEvents> = {};

  on<TEventType extends keyof TEvents>(
    eventType: TEventType,
    handler: TEvents[TEventType]
  ): void {
    const handlers = this.eventHandlers[eventType];

    if (handlers) {
      handlers.add(handler);
    } else {
      this.eventHandlers[eventType] = new Set([handler]);
    }
  }

  off<TEventType extends keyof TEvents>(
    eventType?: TEventType,
    handler?: TEvents[TEventType]
  ): void {
    if (!eventType) {
      this.eventHandlers = {};

      return;
    }

    if (!handler) {
      delete this.eventHandlers[eventType];

      return;
    }

    const handlers = this.eventHandlers[eventType];

    if (handlers) {
      handlers.delete(handler);
    }
  }

  trigger<TEventType extends keyof TEvents>(
    eventType: TEventType,
    ...args: Parameters<TEvents[TEventType]>
  ): void {
    const handlers = this.eventHandlers[eventType];

    if (handlers) {
      handlers.forEach((handler) => handler(...args));
    }
  }
}
