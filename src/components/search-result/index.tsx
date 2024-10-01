import { type Component, For, Match, Switch } from "solid-js";
import { ValiError } from "valibot";

import { createSearchQuery } from "../../data/search";
import { t } from "../../i18n";
import EntryCard from "../entry-card";

export interface SearchResultProps {
  q: string;
}

const SearchResult: Component<SearchResultProps> = (props) => {
  const searchQuery = createSearchQuery(
    () => ({ q: props.q, sort: null, start: null }),
    {},
  );

  return (
    <Switch>
      <Match when={searchQuery.isPending}>
        <div class="text-center mt-2">
          <div
            class="spinner-border text-primary mt-3 mb-2"
            role="status"
            aria-hidden="true"
          />
          <p>{t.loadingData()}</p>
        </div>
      </Match>

      <Match when={searchQuery.isError}>
        <p>Error:</p>
        <pre>{searchQuery.error?.message}</pre>
        {searchQuery.error instanceof ValiError ? (
          <pre>{JSON.stringify(searchQuery.error.issues)}</pre>
        ) : null}
      </Match>

      <Match when={searchQuery.isSuccess}>
        <div class="row">
          <For each={searchQuery.data}>
            {(entry) => (
              <div class="col-12 col-md-6 p-2 d-flex align-items-stretch">
                <EntryCard data={entry} />
              </div>
            )}
          </For>
        </div>
      </Match>
    </Switch>
  );
};

export default SearchResult;
