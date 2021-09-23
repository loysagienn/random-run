import React, { createElement } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducer } from "reducer";
import { Store, State, Action } from "types";
import { Root } from "components/Root";
import { initialState } from "server/app/initialState";

export const renderApp = (store: Store) =>
  createElement(Provider, { store }, createElement(Root));

export const getStore = (initialState: State, composeEnhancers = compose) =>
  createStore<State, Action, {}, {}>(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
