import { initApp } from "./app";
import { HTTP_PORT } from "config";

function logServerStart(httpPort: number) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `\n--------------- server start on port ${httpPort} ---------------\n`
  );
}

async function init() {
  try {
    await initApp({ httpPort: HTTP_PORT });

    logServerStart(HTTP_PORT);
  } catch (error) {
    console.log("init app error");
    console.error(error);
  }
}

init();
