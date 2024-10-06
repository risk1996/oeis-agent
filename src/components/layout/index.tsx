import type { RouteSectionProps } from "@solidjs/router";
import type { Component } from "solid-js";

import Footer from "../footer";
import Header from "../header";

const Layout: Component<RouteSectionProps> = (props) => (
  <>
    <Header />
    <div class="bg-body pt-3">
      <main class="container-lg">{props.children}</main>
    </div>
    <Footer />
  </>
);

export default Layout;
