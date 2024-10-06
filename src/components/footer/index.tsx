import clsx from "clsx";
import type { Component, JSX } from "solid-js";

import { t } from "../../i18n";

export interface FooterProps extends JSX.HTMLAttributes<HTMLElement> {
  class?: string;
}

const Footer: Component<FooterProps> = ({ class: cls, ...props }) => (
  <footer class={clsx("py-3 bg-body-tertiary", cls)} {...props}>
    <p class="text-center text-body-secondary">
      {`${t.footer.madeBy()} ${t.author()} © ${new Date().getFullYear()}`}
    </p>
  </footer>
);

export default Footer;
