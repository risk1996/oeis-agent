import type { Component, JSX } from "solid-js";

export interface TabsProps extends JSX.HTMLAttributes<HTMLUListElement> {
  children: JSX.Element;
}

const Tabs: Component<TabsProps> = ({ children, ...props }) => (
  <ul class="nav nav-underline border-bottom" {...props}>
    {children}
  </ul>
);

export default Tabs;
