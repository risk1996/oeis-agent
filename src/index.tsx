/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";
import { initializeBootstrap } from "./helpers/bootstrap";

initializeBootstrap();

const root = document.getElementById("root");

if (root instanceof HTMLElement) render(() => <App />, root);
else if (import.meta.env.DEV)
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html?",
  );
