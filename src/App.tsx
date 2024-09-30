import type { Component } from "solid-js";

import Header from "./components/header";
import SearchResult from "./components/search-result";

import "halfmoon/css/halfmoon.min.css";
import "solid-devtools";

const App: Component = () => {
  return (
    <>
      <Header />
      <SearchResult />
    </>
  );
};

export default App;
