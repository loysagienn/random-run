import { render } from "react-dom";
import { compose } from "redux";
import { getStore, renderApp } from "store";

const {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: composeEnhancers = compose,
  __INITIAL_STATE__: initialState,
} = window;

const appNode = document.getElementById("app");

const store = getStore(initialState, composeEnhancers);

const app = renderApp(store);

render(app, appNode);