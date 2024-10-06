import clsx from "clsx";
import type { Component, JSX } from "solid-js";

export interface ModalProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
  children?: JSX.Element;
  size: "sm" | "md" | "lg" | "xl";
}

const Modal: Component<ModalProps> = ({
  class: cls,
  children,
  size,
  ...props
}) => (
  <div
    class={clsx("modal fade", cls)}
    tabindex="-1"
    aria-hidden="true"
    {...props}
  >
    <div
      class={clsx("modal-dialog", {
        "modal-sm": size === "sm",
        "modal-lg": size === "lg",
        "modal-xl": size === "xl",
      })}
    >
      <div class="modal-content">{children}</div>
    </div>
  </div>
);

export default Modal;
