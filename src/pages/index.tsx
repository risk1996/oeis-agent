import type { Component } from "solid-js";
import SearchResult from "../components/search-result";
import { t } from "../i18n";

const IndexPage: Component = () => {
  return (
    <>
      <h4>{t.recentAdditions()}</h4>

      <SearchResult q="keyword:new" />
    </>
  );
};

export default IndexPage;
