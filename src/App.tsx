import { Route, Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import type { Component } from "solid-js";

import Header from "./components/header";
import IndexPage from "./pages";

import "halfmoon/css/halfmoon.min.css";
import "solid-devtools";

const App: Component = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Router>
        <Route path="/" component={IndexPage} />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
