import { compose } from "redux";
import { State } from "types";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    __INITIAL_STATE__: State;
  }
}
