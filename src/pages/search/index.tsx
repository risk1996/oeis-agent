import { type Params, useSearchParams } from "@solidjs/router";
import type { Component } from "solid-js";

import Layout from "../../components/layout";
import SearchResult from "../../components/search-result";

export interface SearchPageParams extends Params {
  q: string;
}

const SearchPage: Component = () => {
  const [searchParams] = useSearchParams<SearchPageParams>();

  return (
    <Layout>
      <SearchResult q={searchParams.q ?? ""} />
    </Layout>
  );
};

export default SearchPage;
