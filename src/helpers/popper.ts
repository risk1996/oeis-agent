export type PopperPlacement = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  placement?: PopperPlacement;
  content: string;
  trigger?: ("hover" | "focus")[];
}
export interface PopoverAttributes {
  "data-bs-toggle": "popover";
  "data-bs-content": string;
  "data-bs-placement"?: PopperPlacement;
  "data-bs-trigger"?: string;
}
export function popover(props: PopoverProps): PopoverAttributes {
  return {
    "data-bs-toggle": "popover",
    "data-bs-content": props.content,
    ...(props.placement ? { "data-bs-placement": props.placement } : {}),
    ...(props.trigger ? { "data-bs-trigger": props.trigger.join(" ") } : {}),
  };
}

export interface TooltipProps {
  title: string;
  placement?: PopperPlacement;
}
export interface TooltipAttributes {
  "data-bs-toggle": "tooltip";
  "data-bs-title": string;
  "data-bs-placement"?: PopperPlacement;
}
export function tooltip(props: TooltipProps): TooltipAttributes {
  return {
    "data-bs-toggle": "tooltip",
    "data-bs-title": props.title,
    ...(props.placement ? { "data-bs-placement": props.placement } : {}),
  };
}
