import type { Component, JSX } from "solid-js";
import Header from "../header";

export interface LayoutProps {
  children: JSX.Element;
}

const Layout: Component<LayoutProps> = (props) => {
  return (
    <>
      <Header />
      <main class="container-lg mt-3">{props.children}</main>
    </>
  );
};

export default Layout;
