import { Popover, Tooltip } from "bootstrap";

function initializeTooltip() {
  const tooltips = document.querySelectorAll(`[data-bs-toggle='tooltip']`);

  for (const element of tooltips) {
    if (!element.getAttribute("data-bs-initialized")) {
      new Tooltip(element);
      element.setAttribute("data-bs-initialized", "true");
    }
  }
}

function initializePopover() {
  const popovers = document.querySelectorAll(`[data-bs-toggle='popover']`);

  for (const element of popovers) {
    if (!element.getAttribute("data-bs-initialized")) {
      new Popover(element);
      element.setAttribute("data-bs-initialized", "true");
    }
  }
}

export function observeBootstrapElement(mutations: MutationRecord[]) {
  for (const mutation of mutations) {
    if (mutation.type === "childList" || mutation.type === "attributes") {
      initializeTooltip();
      initializePopover();
    }
  }
}
