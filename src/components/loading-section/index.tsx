import clsx from "clsx";
import type { Component, JSX } from "solid-js";

import { t } from "../../i18n";

export interface LoadingSectionProps
  extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

const LoadingSection: Component<LoadingSectionProps> = ({
  class: cls,
  ...props
}) => (
  <div class={clsx("text-center", cls)} {...props}>
    <div
      class="spinner-border text-primary mb-2"
      role="status"
      aria-hidden="true"
    />

    <p>{t.search.loadingData()}</p>
  </div>
);

export default LoadingSection;
