import { type Params, useSearchParams } from "@solidjs/router";
import { type Component, Match, Switch, createSignal } from "solid-js";

import SearchResult from "../../components/search-result";
import SortSelect from "../../components/sort-select";
import Sort from "../../enums/sort";
import { t } from "../../i18n";

export interface SearchPageParams extends Params {
  q: string;
}

const SearchPage: Component = () => {
  const [searchParams] = useSearchParams<SearchPageParams>();
  const getQ = () => searchParams.q ?? "";

  const [sort, setSort] = createSignal(Sort.Relevance);

  return (
    <Switch>
      <Match when={getQ() === ""}>
        <h4>{t.search.noQuery()}</h4>
        <p>{t.search.startMessage()}</p>
      </Match>
      <Match when={true}>
        <div class="d-flex justify-content-between">
          <h4>{t.search.resultMessage(getQ())}</h4>
          <SortSelect value={sort()} onChange={setSort} />
        </div>

        <SearchResult q={getQ()} sort={sort()} />
      </Match>
    </Switch>
  );
};

export default SearchPage;
