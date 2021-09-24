import { compose } from "redux";
import { State } from "types";
import ymaps from "yandex-maps";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    __INITIAL_STATE__: State;
    ymaps: typeof ymaps;
  }
}
