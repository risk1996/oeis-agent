import { makePersisted } from "@solid-primitives/storage";
import { createSignal } from "solid-js";

export type ColorScheme = "light" | "dark";

function getDefaultColorScheme(): ColorScheme {
  const prefersLightScheme = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;

  return prefersLightScheme ? "light" : "dark";
}

export const [getColorScheme, setColorScheme] = makePersisted(
  createSignal(getDefaultColorScheme()),
  { storage: localStorage, name: "color-scheme" },
);
