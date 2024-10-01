import clsx from "clsx";
import type { Component } from "solid-js";
import { t } from "../../i18n";

export interface FooterProps {
  class?: string;
}

const Footer: Component<FooterProps> = (props) => (
  <footer class={clsx("py-3 bg-body-tertiary", props.class)}>
    <p class="text-center text-body-secondary">
      {`${t.footer.madeBy()} ${t.author()} © ${new Date().getFullYear()}`}
    </p>
  </footer>
);

export default Footer;
