import { Tooltip } from "bootstrap";
import { onCleanup } from "solid-js";

export type PopperPlacement = "top" | "bottom" | "left" | "right";
export interface TooltipProps {
  title: string;
  placement?: PopperPlacement;
}
export function tooltip(el: Element, value: () => TooltipProps): void {
  const props = value();
  el.setAttribute("data-bs-toggle", "tooltip");
  el.setAttribute("data-bs-title", props.title);
  if (props.placement) el.setAttribute("data-bs-placement", props.placement);

  const tooltip = new Tooltip(el);
  onCleanup(() => tooltip.dispose());
}

export interface PopoverProps {
  placement?: PopperPlacement;
  content: string;
  trigger?: ("hover" | "focus")[];
}
export function popover(el: Element, value: () => PopoverProps): void {
  const props = value();
  el.setAttribute("data-bs-toggle", "popover");
  el.setAttribute("data-bs-content", props.content);
  if (props.placement) el.setAttribute("data-bs-placement", props.placement);
  if (props.trigger)
    el.setAttribute("data-bs-trigger", props.trigger.join(" "));

  const popover = new Tooltip(el);
  onCleanup(() => popover.dispose());
}

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      tooltip: TooltipProps;
      popover: PopoverProps;
    }
  }
}
