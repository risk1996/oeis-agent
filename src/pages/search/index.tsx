import { type Params, useSearchParams } from "@solidjs/router";
import { type Component, Match, Switch } from "solid-js";

import SearchResult from "../../components/search-result";
import { t } from "../../i18n";

export interface SearchPageParams extends Params {
  q: string;
}

const SearchPage: Component = () => {
  const [searchParams] = useSearchParams<SearchPageParams>();
  const getQ = () => searchParams.q ?? "";

  return (
    <Switch>
      <Match when={getQ() === ""}>
        <h4>{t.noSearchQuery()}</h4>
        <p>{t.startSearching()}</p>
      </Match>
      <Match when={true}>
        <h4>{t.searchResultFor(getQ())}</h4>

        <SearchResult q={getQ()} />
      </Match>
    </Switch>
  );
};

export default SearchPage;
