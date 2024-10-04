import { Route, Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import type { Component } from "solid-js";

import Layout from "./components/layout";
import IndexPage from "./pages";
import NotFoundPage from "./pages/not-found";
import SearchPage from "./pages/search";

const App: Component = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router root={Layout} base={import.meta.env.BASE_URL}>
        <Route path="/" component={IndexPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="*404" component={NotFoundPage} />
      </Router>

      <SolidQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
