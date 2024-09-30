import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import type { Component } from "solid-js";

import Header from "./components/header";
import SearchResult from "./components/search-result";

import "halfmoon/css/halfmoon.min.css";
import "solid-devtools";

const App: Component = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <SearchResult />
    </QueryClientProvider>
  );
};

export default App;
