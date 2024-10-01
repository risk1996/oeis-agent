import * as bootstrap from "bootstrap";

export function initializeBootstrap() {
  const initializeTooltips = () => {
    const tooltips = document.querySelectorAll("[data-bs-toggle='tooltip']");
    for (const element of tooltips) {
      if (!element.getAttribute("data-bs-initialized")) {
        new bootstrap.Tooltip(element);
        element.setAttribute("data-bs-initialized", "true");
      }
    }
  };

  initializeTooltips();

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList)
      if (mutation.type === "childList" || mutation.type === "attributes")
        initializeTooltips();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
  });
}
