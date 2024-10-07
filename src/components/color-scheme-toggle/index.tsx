import { Icon } from "@iconify-icon/solid";
import clsx from "clsx";
import { type Component, type JSX, createEffect } from "solid-js";

import { getColorScheme, setColorScheme } from "../../helpers/color-scheme";

export interface ColorSchemeToggleProps
  extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  class?: string;
}

const ColorSchemeToggle: Component<ColorSchemeToggleProps> = ({
  class: cls,
  ...props
}) => {
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
