import { renderToString } from "react-dom/server";
import { AppContext, State } from "types";
import { getStore, renderApp } from "store";
import { YANDEX_MAPS_API_KEY } from "config";

const bodyStyle = "background-color: #f5f5f5;";
const bundleRoot = "/static/dist/";

const serverRenderingOn = () => true;

// const render = (initialState) =>
// serverRenderingOn() ? renderAppContent(initialState) : "";

function render(initialState: State): string {
  if (!serverRenderingOn()) {
    return "";
  }

  const store = getStore(initialState);

  const app = renderApp(store);

  return renderToString(app);
}

export function renderHtml(ctx: AppContext) {
  return `<!DOCTYPE html>
  <html lang="ru-RU">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=yes">
      <meta name="mobile-web-app-capable" content="yes">
      <meta name="format-detection" content="telephone=no">
      <meta name="format-detection" content="address=no">
      <meta name="theme-color" content="#1f2c3b">
      <link rel="stylesheet" href="${bundleRoot}app.css">
      <link rel="icon" type="image/png" href="/static/favicon.png" sizes="32x32">
  </head>
  <body style="${bodyStyle}">
      <div id="app">${render(ctx.state.initialState)}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(
        ctx.state.initialState
      )}</script>
      <script src="https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAPS_API_KEY}&lang=ru_RU" type="text/javascript"></script>
      <script src="${bundleRoot}app.js"></script>
  </body>
</html>`;
}
