import clsx from "clsx";
import type { Component, JSX } from "solid-js";

export interface TabItemProps extends JSX.HTMLAttributes<HTMLLIElement> {
  children: JSX.Element;
  active: boolean;
}

const TabItem: Component<TabItemProps> = ({ children, active, ...props }) => (
  <li class="nav-item" {...props}>
    <span class={clsx("nav-link", { active })} aria-current={active}>
      {children}
    </span>
  </li>
);

export default TabItem;
