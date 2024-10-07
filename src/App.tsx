import { HashRouter, Route } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import type { Component } from "solid-js";

import Layout from "./components/layout";
import IndexPage from "./pages";
import DetailPage from "./pages/id/[id]";
import NotFoundPage from "./pages/not-found";
import SearchPage from "./pages/search";

const App: Component = () => (
  <QueryClientProvider client={new QueryClient()}>
    <HashRouter root={Layout}>
      <Route path="/" component={IndexPage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/id/:id" component={DetailPage} />
      <Route path="*404" component={NotFoundPage} />
    </HashRouter>

    <SolidQueryDevtools />
  </QueryClientProvider>
);

export default App;
