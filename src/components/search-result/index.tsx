import { type Component, For, Match, Switch } from "solid-js";
import { ValiError } from "valibot";

import { createSearchOEISQuery, getQ } from "../../data/search";
import OEISEntryCard from "../oeis-entry-card";

export type SearchResultProps = Record<never, never>;

const SearchResult: Component<SearchResultProps> = () => {
  const searchQuery = createSearchOEISQuery(getQ, {});

  return (
    <main class="container-lg mt-3">
      <Switch>
        <Match when={getQ() === ""}>
          <h4>No search query</h4>
          <p>Start searching to view OEIS entries...</p>
        </Match>
        <Match when={true}>
          <h4>Search result for "{getQ()}"</h4>

          <Switch>
            <Match when={searchQuery.isPending}>
              <div class="text-center mt-2">
                <div
                  class="spinner-border text-primary mt-3 mb-2"
                  role="status"
                  aria-hidden="true"
                />
                <p>Loading data...</p>
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
              <For each={searchQuery.data}>
                {(entry) => <OEISEntryCard data={entry} />}
              </For>
            </Match>
          </Switch>
        </Match>
      </Switch>
    </main>
  );
};

export default SearchResult;
