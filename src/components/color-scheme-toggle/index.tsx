import { Icon } from "@iconify-icon/solid";
import { makePersisted } from "@solid-primitives/storage";
import clsx from "clsx";
import { type Component, type JSX, createEffect, createSignal } from "solid-js";

export interface ColorSchemeToggleProps
  extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  class?: string;
}

export type ColorScheme = "light" | "dark";

function getDefaultColorScheme(): ColorScheme {
  const prefersLightScheme = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;

  return prefersLightScheme ? "light" : "dark";
}

const ColorSchemeToggle: Component<ColorSchemeToggleProps> = ({
  class: cls,
  ...props
}) => {
  const [getColorScheme, setColorScheme] = makePersisted(
    createSignal(getDefaultColorScheme()),
    { storage: localStorage, name: "color-scheme" },
  );
  createEffect(() =>
    document.documentElement.setAttribute("data-bs-theme", getColorScheme()),
  );

  const toggleColorScheme = () =>
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <button
      type="button"
      class={clsx(
        "btn",
        {
          "btn-dark": getColorScheme() === "dark",
          "btn-light": getColorScheme() === "light",
        },
        cls,
      )}
      onClick={toggleColorScheme}
      {...props}
    >
      <Icon
        icon={getColorScheme() === "light" ? "tabler:sun" : "tabler:moon"}
        class="align-middle"
        width="1rem"
      />
    </button>
  );
};

export default ColorSchemeToggle;
