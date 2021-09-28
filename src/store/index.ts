import { createElement } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducer } from "reducer";
import { Store, State, Action, Api } from "types";
import { Root } from "components/Root";

export const renderApp = (store: Store) =>
  createElement(Provider, { store }, createElement(Root));

export const getStore = (
  initialState: State,
  api: Api,
  composeEnhancers = compose
) =>
  createStore<State, Action, {}, {}>(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)))
  );
