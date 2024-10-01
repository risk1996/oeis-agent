import type { RouteSectionProps } from "@solidjs/router";
import type { Component } from "solid-js";

import Header from "../header";

const Layout: Component<RouteSectionProps> = (props) => {
  return (
    <>
      <Header />
      <main class="container-lg mt-3">{props.children}</main>
    </>
  );
};

export default Layout;
