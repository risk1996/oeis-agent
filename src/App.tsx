import { createMutationObserver } from "@solid-primitives/mutation-observer";
import { Route, Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import type { Component } from "solid-js";

import Layout from "./components/layout";
import { observeBootstrapElement } from "./helpers/bootstrap";
import IndexPage from "./pages";
import DetailPage from "./pages/[id]";
import NotFoundPage from "./pages/not-found";
import SearchPage from "./pages/search";

const App: Component = () => {
  const queryClient = new QueryClient();

  createMutationObserver(
    document.body,
    { childList: true, subtree: true, attributes: false },
    observeBootstrapElement,
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Router root={Layout} base={import.meta.env.BASE_URL}>
        <Route path="/" component={IndexPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/:id" component={DetailPage} />
        <Route path="*404" component={NotFoundPage} />
      </Router>

      <SolidQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
