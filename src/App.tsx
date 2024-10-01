import { Route, Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import type { Component } from "solid-js";

import Layout from "./components/layout";
import IndexPage from "./pages";
import SearchPage from "./pages/search";

import "halfmoon/css/halfmoon.min.css";
import "solid-devtools";

const App: Component = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router root={Layout}>
        <Route path="/" component={IndexPage} />
        <Route path="/search" component={SearchPage} />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
